import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import vehicles, { Vehicle } from '../models/Vehicle';
import { ObjectId } from 'mongodb';

export default function (fastify: FastifyInstance) {
  fastify.get(
    '/vehicles',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return {
        vehicles: await vehicles.find().toArray(),
      };
    },
  );

  fastify.post(
    '/vehicles',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const vehicle = request.body as Vehicle;
      const vehicleToInsert = await vehicles.insertOne({
        name: vehicle.name,
      });
      return {
        vehicle: vehicleToInsert,
      };
    },
  );
  fastify.get(
    '/vehicles/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const vehicle = request.params as { id: string };
      const vehicleToValidate = await vehicles.findOne({
        _id: new ObjectId(vehicle.id),
      });
      if (!vehicleToValidate) {
        reply.status(404);
        return {
          error: 'Vehicle not found',
        };
      }
      reply.status(200);
    },
  );

  fastify.put(
    '/vehicles/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const vehicle = request.body as Vehicle;
      const params = request.params as { id: string };
      const vehicleToValidate = await vehicles.findOne({
        _id: new ObjectId(params.id),
      });
      if (!vehicleToValidate) {
        reply.status(404);
        return {
          error: 'Vehicle not found',
        };
      }
      const updated = await vehicles.updateOne(
        { _id: new ObjectId(params.id) },
        { $set: { name: vehicle.name } },
      );
      reply.status(200);
      return {
        vehicle: updated,
      }
    },
  );
}
