import {FastifyInstance, FastifyRequest, FastifyReply} from 'fastify';
import {Resource} from 'fastify-autoroutes';
import users from '../models/User';
import {ObjectId, ErrorDescription, BSON} from 'mongodb';
import {Static, Type} from '@sinclair/typebox';

export const LoginPayload = Type.Object({
  code: Type.String(),
});

export default function (fastify: FastifyInstance) {
  return <Resource>{
    post: {
      schema: {
        body: LoginPayload,
      },
      handler: async function (request: FastifyRequest, reply: FastifyReply) {
        try {
          const {code} = request.body as Static<typeof LoginPayload>;
          const user = await users.findOne({
            _id: new ObjectId(code),
          });
          if (!user) {
            reply.status(404);
            throw new Error('User not found');
          }
          return {
            login: user,
          };
        } catch (error: any) {
          if (error instanceof BSON.BSONError) {
            reply.status(400);
            throw new Error('Codigo incorrecto');
          }
          throw error;
        }
      },
    },
  };
}
