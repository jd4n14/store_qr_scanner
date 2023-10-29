import { fetchApi } from "../../config/fetch";
import { Store } from "./types";

export const getAllStoresApi = () => {
  return fetchApi("/stores") as Promise<{
    stores: Store[];
  }>;
};

export const createNewStoreApi = async ({ name }: { name: string }) => {
  return fetchApi("/stores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  }) as Promise<void>;
};
