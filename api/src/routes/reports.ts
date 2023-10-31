import {FastifyInstance, FastifyRequest, FastifyReply} from 'fastify';
import {Resource} from 'fastify-autoroutes';
import records from '../models/Record';

export default function (fastify: FastifyInstance) {
  return <Resource>{
    get: {
      handler: async function (request: FastifyRequest, reply: FastifyReply) {
        // return all records grouped by date, userId, storeId
        return {
          records: []
        };
      },
    },
  };
}
