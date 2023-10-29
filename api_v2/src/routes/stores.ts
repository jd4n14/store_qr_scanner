import {FastifyInstance, FastifyRequest, FastifyReply} from 'fastify';
import {Resource} from 'fastify-autoroutes';
import stores from '../models/Store';

export default function (fastify: FastifyInstance) {
  return <Resource>{
    get: {
      handler: async function (request: FastifyRequest, reply: FastifyReply) {
        return {
          stores: await stores.find().toArray(),
        };
      },
    },
    post: {
      handler: async function (request: FastifyRequest, reply: FastifyReply) {
        const {name} = request.body as {name: string};
        const store = await stores.insertOne({
          name,
        });
        return {
          store,
        };
      },
    },
  };
}
