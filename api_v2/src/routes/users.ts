import {FastifyInstance, FastifyRequest, FastifyReply} from 'fastify';
import {Resource} from 'fastify-autoroutes';
import users, {User} from '../models/User';

export default function (fastify: FastifyInstance) {
  return <Resource>{
    get: {
      handler: async function (request: FastifyRequest, reply: FastifyReply) {
        return {
          // fin all users that user
          users: await users.find().toArray(),
        };
      },
    },
    post: {
      handler: async function (request: FastifyRequest, reply: FastifyReply) {
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
    },
  };
}
