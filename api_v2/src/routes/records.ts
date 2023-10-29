import {FastifyInstance, FastifyRequest, FastifyReply} from 'fastify';
import {Resource} from 'fastify-autoroutes';
import records, {Record} from '../models/Record';

export default function (fastify: FastifyInstance) {
  return <Resource>{
    get: {
      handler: async function (request: FastifyRequest, reply: FastifyReply) {
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        // get all records from the current month and group them by date (same day)
        const monthRecords = await records
          .aggregate([
            {
              $match: {
                date: {
                  $gte: new Date(`${currentYear}-${currentMonth}-01`),
                  $lt: new Date(`${currentYear}-${currentMonth + 1}-01`),
                },
              },
            },
            {
              $group: {
                _id: {
                  year: {$year: '$date'},
                  month: {$month: '$date'},
                  day: {$dayOfMonth: '$date'},
                },
                records: {
                  $push: {
                    userId: '$userId',
                    storeId: '$storeId',
                    vehicleId: '$vehicleId',
                    date: '$date',
                  },
                },
              },
            },
            {
              $sort: {
                date: 1,
              },
            },
            {
              $project: {
                _id: 0,
                date: {
                  $dateToString: {
                    format: '%Y-%m-%d',
                    date: {
                      $dateFromParts: {
                        year: '$_id.year',
                        month: '$_id.month',
                        day: '$_id.day',
                      },
                    },
                  },
                },
                records: 1,
              },
            },
          ])
          .toArray();

        return monthRecords;
      },
    },
    post: {
      handler: async function (request: FastifyRequest, reply: FastifyReply) {
        const user = request.body as Record;
        user.date = new Date();
        // first search if has a record with the same date
        const existingRecords = await records
          .find({
            date: {
              $gte: new Date(
                `${user.date.getFullYear()}-${
                  user.date.getMonth() + 1
                }-${user.date.getDate()}`
              ),
              $lt: new Date(
                `${user.date.getFullYear()}-${user.date.getMonth() + 1}-${
                  user.date.getDate() + 1
                }`
              ),
            },
            userId: user.userId,
            storeId: user.storeId,
            vehicleId: user.vehicleId,
          })
          .sort({
            date: -1,
          })
          .toArray();
        if (existingRecords.length >= 2) {
          // update the date of the last record
          await records.updateOne(
            {
              date: {
                $gte: new Date(
                  `${user.date.getFullYear()}-${
                    user.date.getMonth() + 1
                  }-${user.date.getDate()}`
                ),
                $lt: new Date(
                  `${user.date.getFullYear()}-${user.date.getMonth() + 1}-${
                    user.date.getDate() + 1
                  }`
                ),
              },
              userId: user.userId,
              storeId: user.storeId,
              vehicleId: user.vehicleId,
            },
            {
              $set: {
                date: user.date,
              },
            }
          );
        } else {
          await records.insertOne({
            userId: user.userId,
            storeId: user.storeId,
            vehicleId: user.vehicleId,
            date: new Date(),
            type: existingRecords.length === 0 ? 'in' : 'out',
          });
        }
        reply.status(201);
      },
    },
  };
}
