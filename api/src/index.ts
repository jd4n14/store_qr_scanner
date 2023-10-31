import Fastify from "fastify";
import autoload from "@fastify/autoload";
import * as path from "node:path";
import fastifyCors from "@fastify/cors";
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
      root: path.join(__dirname, "..", "..", "app", "dist"),
      wildcard: true,
    });
    app.get("/", async (req, reply) => {
      return reply.sendFile("index.html");
    });
    // redirect all other routes to index.html
    app.setNotFoundHandler(async (req, reply) => {
      return reply.sendFile("index.html");
    });

    await app.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
