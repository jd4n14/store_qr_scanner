import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { Resource } from 'fastify-autoroutes';
import records, { Record } from '../models/Record';
import users from '../models/User';
import stores from '../models/Store';
import vehicles from '../models/Vehicle';
import { ObjectId } from 'mongodb';
import {
  startOfMonth,
  endOfMonth,
  toDate,
  startOfDay,
  endOfDay,
} from 'date-fns';

export default function (fastify: FastifyInstance) {
  fastify.get(
    '/records',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const queryParams = request.query as {
        userId?: string;
        storeId?: string;
        date?: string;
      };
      // get all records from the current month and group them by date (same day)
      const matchQuery: {} = {
        date: {
          $gte: toDate(startOfMonth(new Date())),
          $lt: toDate(endOfMonth(new Date())),
        },
      };
      if (queryParams.userId) {
        // @ts-ignore
        matchQuery['user._id'] = new ObjectId(queryParams.userId);
      }
      if (queryParams.storeId) {
        // @ts-ignore
        matchQuery['store._id'] = new ObjectId(queryParams.storeId);
      }
      if (queryParams.date) {
        // @ts-ignore
        matchQuery['date'] = {
          $gte: toDate(startOfDay(new Date(queryParams.date))),
          $lte: toDate(endOfDay(new Date(queryParams.date))),
        };
      }
      const monthRecords = await records
        .aggregate([
          {
            $match: matchQuery,
          },
          {
            $group: {
              _id: {
                userId: '$user._id',
                storeId: '$store._id',
                vehicleId: '$vehicle._id',
                date: {
                  $dateToString: { format: '%Y-%m-%d', date: '$date' },
                },
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
              date: '$_id.date',
              records: 1,
            },
          },
        ])
        .limit(50)
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
          },
        );
        return { id, ...info };
      });
      return groupedRecords;
    },
  );
  fastify.post<{
    Body: Record;
  }>('/records', async (request: FastifyRequest, reply: FastifyReply) => {
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
          $gte: toDate(startOfDay(new Date())),
          $lte: toDate(endOfDay(new Date())),
        },
        user: user,
        store: store,
        vehicle: vehicle,
      })
      .sort({
        date: -1,
      })
      .toArray();
    if (existingRecords.length >= 2) {
      const outRecord = existingRecords.find((record) => record.type === 'out');
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
        },
      );
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
  });
}
