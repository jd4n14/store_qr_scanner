import Fastify from 'fastify';
import autoload from '@fastify/autoload';
import * as path from 'node:path'
import fastifyCors from "@fastify/cors";

const app = Fastify({
  logger: true
});

app.register(autoload, {
  dir: path.join(__dirname, 'plugins')
});

const start = async () => {
  try {
    app.register(fastifyCors, {
      origin: '*',
      allowedHeaders: ['Content-Type', 'Authorization']
    })
    await app.listen({port: 3000})
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
