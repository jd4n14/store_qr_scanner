import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { appRouter } from "./router";
import { createContext } from "./router/context";
import { prisma } from "./prisma";

async function createServer() {
  const dev = process.env.NODE_ENV === "development" ?? true;
  const port = process.env.PORT ?? 3000;
  const prefix = "/trpc";
  const server = fastify({ logger: dev });

  void server.register(fastifyTRPCPlugin, {
    prefix,
    trpcOptions: { router: appRouter, createContext },
  });

  server.get("/", async () => {
    return { hello: "wait-on 💨" };
  });

  const start = async () => {
    try {
      await prisma.$connect();
      await server.listen({ port });
      console.log("listening on port", port);
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  };
  console.log("starting server...");

  await start();
}

createServer();
