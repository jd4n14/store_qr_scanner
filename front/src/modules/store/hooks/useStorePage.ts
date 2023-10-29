import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { getAllStoresApi, createNewStoreApi } from "../api";
import { Store } from "../types";
import { useState } from "react";

export const useStorePage = () => {
  const [search, setSearch] = useState("");
  
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

  const storeList = (allStoresRequest?.data?.stores || []).filter((store) => {
    if (search.trim() === "") {
      return true;
    }
    return store.name.toLowerCase().includes(search.toLowerCase());
  });

  return {
    allStoresRequest,
    createStoreRequest,
    onSubmit,
    isLoading: allStoresRequest.isLoading,
    storeList,
    onSearch: setSearch
  }
};
