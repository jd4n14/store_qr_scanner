import {useAuth} from "../hooks/useAuth.ts";
import {Navigate} from "react-router-dom";

export const ProtectedRoute = (
  { component, ...rest }
) => {
  const { isLogged } = useAuth();
  return isLogged ? component : <Navigate to="/login" />
}