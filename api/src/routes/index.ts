import { FastifyInstance } from "fastify";
import loginRoutes from "./login";
import filtersRoutes from "./filters";
import recordsRoutes from "./records";
import storesRoutes from "./stores";
import usersRoutes from "./users";
import vehiclesRoutes from "./vehicles";

export const loadRoutes = (app: FastifyInstance) => {
  loginRoutes(app);
  filtersRoutes(app);
  recordsRoutes(app);
  storesRoutes(app);
  usersRoutes(app);
  vehiclesRoutes(app);
};
