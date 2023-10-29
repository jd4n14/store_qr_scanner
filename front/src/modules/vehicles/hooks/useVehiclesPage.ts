import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNewVehicleApi, getAllVehiclesApi } from "../api";
import { Vehicle } from "../types";

export const useVehiclesPage = () => {
  const queryClient = useQueryClient();
  const allVehiclesRequest = useQuery({
    queryKey: ["vehicles"],
    queryFn: getAllVehiclesApi,
  });
  const createVehicleRequest = useMutation({
    mutationFn: (values: Pick<Vehicle, 'name'>) => createNewVehicleApi(values),
    mutationKey: ["createVehicle"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
  const onSubmit = (values: Pick<Vehicle, 'name'> , toggle: () => void) => {
    toggle();
    return createVehicleRequest.mutateAsync(values);
  };
  return {
    allVehiclesRequest,
    createVehicleRequest,
    onSubmit,
  }
}