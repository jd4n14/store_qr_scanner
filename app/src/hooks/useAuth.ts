import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage.ts";
import { useEffect, useMemo } from "react";

export const useAuth = () => {
  const [credentials, setCredentials] = useLocalStorage("user", null);
  const [vehicleId, setVehicleId] = useLocalStorage("vehicle_id", null);
  const navigate = useNavigate();

  const isLogged = credentials !== null;
  const login = (val: any) => {
    setCredentials(JSON.stringify(val));
  };

  const user = useMemo(() => {
    return credentials?.trim() && JSON.parse(credentials || "");
  }, [credentials]);

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, []);


  return {
    user,
    login,
    vehicleId,
    setVehicleId,
    isLogged,
  };
};
