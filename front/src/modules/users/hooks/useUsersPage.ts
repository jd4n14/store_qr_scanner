import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNewUserApi, getAllUsersApi } from "../api";
import { User } from "../types";

export const useUsersPage = () => {
  const queryClient = useQueryClient();
  const allUsersRequest = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsersApi,
  });
  const createUserRequest = useMutation({
    mutationFn: (values: Pick<User, 'name'>) => createNewUserApi(values),
    mutationKey: ["createUser"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  const onSubmit = (values: Pick<User, 'name'> , toggle: () => void) => {
    toggle();
    return createUserRequest.mutateAsync(values);
  };
  return {
    allUsersRequest,
    createUserRequest,
    onSubmit,
  }
}