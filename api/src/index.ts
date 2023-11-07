import Fastify from 'fastify';
import * as path from 'node:path';
import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import { loadRoutes } from './routes';
import 'dotenv/config'

const app = Fastify({
  logger: true,
});

const start = async () => {
  try {
    app.register(fastifyCors, {
      origin: '*',
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.register(fastifyStatic, {
      root: path.join(__dirname, '..', '..', 'app', 'dist'),
      wildcard: true,
    });
    app.get('/', async (req, reply) => {
      return reply.sendFile('index.html');
    });

    loadRoutes(app);
    // redirect all other routes to index.html
    app.setNotFoundHandler(async (req, reply) => {
      return reply.sendFile('index.html');
    });

    await app.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
