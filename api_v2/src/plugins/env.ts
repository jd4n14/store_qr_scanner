import 'dotenv/config'
import fastifyEnv from '@fastify/env'
import {FastifyInstance} from "fastify";

const schema = {
  type: 'object',
  properties: {
    PORT: {
      type: 'string',
      default: '3000',
    },
    MONGO_URL: {
      type: 'string',
      default: 'mongodb://localhost:27017',
    },
    NODE_ENV: {
      type: 'string',
      default: 'development',
    }
  },
  required: ['PORT', 'MONGO_URL'],
}

const options = {
  schema: schema,
  data: process.env,
  dotenv: true,
}

export default function (f: FastifyInstance, opts: {  }, next: () => void) {
  f.register(fastifyEnv, options)
  next()
}

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: string,
      MONGO_URL: string,
      NODE_ENV: string,
    };
  }
}
