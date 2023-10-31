import {FastifyInstance, FastifyRequest, FastifyReply} from 'fastify';
import {Resource} from 'fastify-autoroutes';
import users from '../models/User';
import stores from '../models/Store';

export default function (fastify: FastifyInstance) {
  return <Resource>{
    get: {
      handler: async function (request: FastifyRequest, reply: FastifyReply) {
        // send filters to the client using this form:
        /**
         * [filterName]: [
         *  {
         *    label: 'filterName',
         *    value: 'filterValue',
         *  },
         * ]
         */
        // list of filters:
        // * users
        // * stores
        const userList = await users
          .find({
            role: {
              name: 'user',
            },
          })
          .toArray();
        const storeList = await stores.find().toArray();
        return {
          users: userList.map(user => ({
            label: user.name,
            value: user._id,
          })),
          stores: storeList.map(store => ({
            label: store.name,
            value: store._id,
          })),
        };
      },
    },
  };
}
