import { FastifyInstance } from "fastify";
import fastifyAutoRoutes from "fastify-autoroutes";

export default function (f: FastifyInstance, opts: {}, next: () => void) {
  f.register(fastifyAutoRoutes, {
    dir: "../routes",
    prefix: "/api",
  });
  next();
}
