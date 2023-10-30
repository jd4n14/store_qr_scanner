import {FastifyInstance, FastifyRequest, FastifyReply} from 'fastify';
import {Resource} from 'fastify-autoroutes';
import records, {Record} from '../models/Record';
import users from "../models/User";
import stores from "../models/Store";
import vehicles from "../models/Vehicle";
import {ObjectId} from "mongodb";

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
                  userId: "$user._id",
                  storeId: "$store._id",
                  vehicleId: "$vehicle._id",
                  date: {
                    $dateToString: {format: "%Y-%m-%d", date: "$date"}
                  }
                },
                records: {
                  $push: {
                    date: '$date',
                    user: '$user',
                    store: '$store',
                    vehicle: '$vehicle',
                    type: '$type',
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
                _id: 1,
                date: "$_id.date",
                records: 1,
              },
            }
          ]).limit(50)
          .toArray();
        const groupedRecords = monthRecords.map((item) => {
          const id = Object.values(item._id).join('');
          const info = item.records.reduce(
            (reducer: {}, item: any) => {
              if (item.type === 'in') {
                // @ts-ignore
                reducer.entranceTime = item.date;
              }
              if (item.type === 'out') {
                // @ts-ignore
                reducer.exitTime = item.date;
              }
              Object.assign(reducer, item);
              return reducer;
            },
            {
              entranceTime: null,
              exitTime: null,
            }
          );
          return { id, ... info };
        })
        return groupedRecords;
      },
    },
    post: {
      handler: async function (request: FastifyRequest, reply: FastifyReply) {
        const record = request.body as {
          userId: string;
          storeId: string;
          vehicleId: string;
          date: Date;
        };
        record.date = new Date();
        const user = await users.findOne({
          _id: new ObjectId(record.userId),
        });
        if (!user) {
          reply.status(404);
          throw new Error('User not found');
        }
        if (user.role.name === 'admin') {
          reply.status(400);
          throw new Error('Admins cannot register records');
        }
        const store = await stores.findOne({
          _id: new ObjectId(record.storeId),
        });
        if (!store) {
          reply.status(404);
          throw new Error('Store not found');
        }
        const vehicle = await vehicles.findOne({
          _id: new ObjectId(record.vehicleId),
        });
        if (!vehicle) {
          reply.status(404);
          throw new Error('Vehicle not found');
        }
        // first search if has a record with the same date
        const existingRecords = await records
          .find({
            date: {
              $gte: new Date(
                `${record.date.getFullYear()}-${
                  record.date.getMonth() + 1
                }-${record.date.getDate()}`
              ),
              $lt: new Date(
                `${record.date.getFullYear()}-${record.date.getMonth() + 1}-${
                  record.date.getDate() + 1
                }`
              ),
            },
            user: user,
            store: store,
            vehicle: vehicle,
          })
          .sort({
            date: -1,
          })
          .toArray();
        console.log({ existingRecords })
        if (existingRecords.length >= 2) {
          const outRecord = existingRecords.find(
            (record) => record.type === 'out'
          );
          if (!outRecord) {
            reply.status(400);
            throw new Error('Cannot register more than 2 records per day');
          }
          // update the date of the last record
          const res = await records.updateOne(
            {
              _id: new ObjectId(outRecord._id),
            },
            {
              $set: {
                date: new Date(),
              },
            }
          );
          console.log(res)
        } else {
          await records.insertOne({
            user: user,
            store: store,
            vehicle: vehicle,
            date: new Date(),
            type: existingRecords.length === 0 ? 'in' : 'out',
          });
        }
        reply.status(201);
      },
    },
  };
}
