import {useLocalStorage} from "./useLocalStorage.ts";
import {useMemo} from "react";

export const useAuth = () => {
  const [credentials, setCredentials] = useLocalStorage('user', null);
  const [vehicleId, setVehicleId] = useLocalStorage('vehicle_id', null);

  const isLogged = credentials !== null;
  const login = (val: any) => {
    setCredentials(JSON.stringify(val))
  }

  const user = useMemo(() => {
    return credentials?.trim() && JSON.parse(credentials || '')
  }, [credentials])

  return {
    user,
    login,
    vehicleId,
    setVehicleId,
    isLogged
  }
}