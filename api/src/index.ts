import Fastify from "fastify";
import autoload from "@fastify/autoload";
import * as path from "node:path";
import fastifyCors from "@fastify/cors";
import path from "node:path";
import fastifyStatic from "@fastify/static";

const app = Fastify({
  logger: true,
});

app.register(autoload, {
  dir: path.join(__dirname, "plugins"),
});

const start = async () => {
  try {
    app.register(fastifyCors, {
      origin: "*",
      allowedHeaders: ["Content-Type", "Authorization"],
    });
    app.register(fastifyStatic, {
      root: path.join(__dirname, "../app/public"),
    });

    app.get("/", async (req, reply) => {
      return reply.sendFile("index.html");
    });

    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
