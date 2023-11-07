import { fetchApi } from "../../config/fetch";
import { Vehicle } from "./types";

export const getAllVehiclesApi = () => {
  return fetchApi("/vehicles") as Promise<{
    vehicles: Vehicle[];
  }>;
};

export const createNewVehicleApi = async ({ name }: Pick<Vehicle, "name">) => {
  return fetchApi("/vehicles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  }) as Promise<void>;
};

export const updateVehicleApi = async ({ name, id }: { name: string; id: string }) => {
  return fetchApi(`/vehicles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  }) as Promise<void>;
};
