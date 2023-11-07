import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import users from "../models/User";
import stores from "../models/Store";

export default function (fastify: FastifyInstance) {
  fastify.get("/filters", async () => {
    const userList = await users
      .find({
        role: {
          name: "user",
        },
      })
      .toArray();
    const storeList = await stores.find().toArray();
    return {
      users: userList.map((user) => ({
        label: user.name,
        value: user._id,
      })),
      stores: storeList.map((store) => ({
        label: store.name,
        value: store._id,
      })),
    };
  });
}
