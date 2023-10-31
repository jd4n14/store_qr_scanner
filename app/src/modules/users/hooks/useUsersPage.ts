import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNewUserApi, getAllUsersApi } from "../api";
import { User } from "../types";
import { useState } from "react";

export const useUsersPage = () => {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const allUsersRequest = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsersApi,
  });

  const createUserRequest = useMutation({
    mutationFn: (values: Omit<User, '_id'>) => createNewUserApi(values),
    mutationKey: ["createUser"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const onSubmit = (values: Omit<User, '_id'> , toggle: () => void) => {
    toggle();
    return createUserRequest.mutateAsync(values);
  };

  const userList = (allUsersRequest?.data?.users || []).filter((user) => {
    if (search.trim() === "") {
      return true;
    }
    return user.name.toLowerCase().includes(search.toLowerCase());
  });

  return {
    allUsersRequest,
    createUserRequest,
    onSubmit,
    userList,
    setSearch,
    isLoadaing: allUsersRequest.isLoading,
    
  }
}