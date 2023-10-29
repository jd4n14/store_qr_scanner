import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { getAllStoresApi, createNewStoreApi } from "../api";
import { Store } from "../types";

export const useStorePage = () => {
  const queryClient = useQueryClient();
  const allStoresRequest = useQuery({
    queryKey: ["stores"],
    queryFn: getAllStoresApi,
  });
  const createStoreRequest = useMutation({
    mutationFn: (values: Store) => createNewStoreApi(values),
    mutationKey: ["createStore"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });

  const onSubmit = (values, toggle: () => void) => {
    toggle();
    createStoreRequest.mutate(values);
  };

  return {
    allStoresRequest,
    createStoreRequest,
    onSubmit
  }
};
