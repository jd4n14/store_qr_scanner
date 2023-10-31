import { fetchApi } from "../../config/fetch";
import { User } from "./types";

export const getAllUsersApi = () => {
  return fetchApi("/users") as Promise<{
    users: User[];
  }>;
};

export const createNewUserApi = async ({ name, code }: Omit<User, "_id">) => {
  return fetchApi("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, code }),
  }) as Promise<void>;
};
