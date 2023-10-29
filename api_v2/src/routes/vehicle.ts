import {FastifyInstance, FastifyRequest, FastifyReply} from 'fastify';
import {Resource} from 'fastify-autoroutes';
import vehicles, {Vehicle} from '../models/Vehicle';
import {ObjectId} from 'mongodb';

export default function (fastify: FastifyInstance) {
  return <Resource>{
    get: {
      handler: async function (request: FastifyRequest, reply: FastifyReply) {
        return {
          vehicles: await vehicles.find().toArray(),
        };
      },
    },
    post: {
      handler: async function (request: FastifyRequest, reply: FastifyReply) {
        const vehicle = request.body as Vehicle;
        const vehicleToInsert = await vehicles.insertOne({
          name: vehicle.name,
        });
        return {
          vehicle: vehicleToInsert,
        };
      },
    },
    put: {
      handler: async function (request: FastifyRequest, reply: FastifyReply) {
        const vehicle = request.body as Vehicle & {_id: string};
        const vehicleToValidate = await vehicles.findOne({
          _id: new ObjectId(vehicle._id),
        });
        if (!vehicleToValidate) {
          reply.status(404);
          return {
            error: 'Vehicle not found',
          };
        }
        reply.status(200);
      },
    },
  };
}
