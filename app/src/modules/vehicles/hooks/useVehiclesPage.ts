import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNewVehicleApi, getAllVehiclesApi, updateVehicleApi } from "../api";
import { Vehicle } from "../types";
import { useState } from "react";
import toast from "react-hot-toast";

export const useVehiclesPage = () => {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  const allVehiclesRequest = useQuery({
    queryKey: ["vehicles"],
    queryFn: getAllVehiclesApi,
  });
  const createVehicleRequest = useMutation({
    mutationFn: (values: Pick<Vehicle, "name">) => createNewVehicleApi(values),
    mutationKey: ["createVehicle"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
  const updateVehicleRequest = useMutation({
    mutationFn: (values: { name: string; id: string }) => updateVehicleApi(values),
    mutationKey: ["updateVehicle"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      toast.success("Vehiculo actualizado");
    },
  });

  const onSubmit = (values: Pick<Vehicle, "name">, toggle: () => void) => {
    toggle();
    return createVehicleRequest.mutateAsync(values);
  };
  const vehicleList = (allVehiclesRequest?.data?.vehicles || []).filter((vehicle) => {
    if (search.trim() === "") {
      return true;
    }
    return vehicle.name.toLowerCase().includes(search.toLowerCase());
  });
  return {
    allVehiclesRequest,
    createVehicleRequest,
    updateVehicle: updateVehicleRequest.mutateAsync,
    onSubmit,
    onSearch: setSearch,
    isLoading: allVehiclesRequest.isLoading,
    vehicleList,
  };
};
