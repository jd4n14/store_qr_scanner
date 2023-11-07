import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { Resource } from 'fastify-autoroutes';
import users, { User } from '../models/User';

export default function (fastify: FastifyInstance) {
  fastify.get(
    '/users',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return {
        users: await users.find().toArray(),
      };
    },
  );
  fastify.post(
    '/users',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const user = request.body as User;
      const userToInsert = await users.insertOne({
        name: user.name,
        code: user.code,
        role: {
          name: 'user',
        },
      });
      return {
        user: userToInsert,
      };
    },
  );
}
