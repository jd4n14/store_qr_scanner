import {Navigate} from "react-router-dom";
import {useEffect} from "react";

const LogoutPage = () => {
  useEffect(() => {
    // delete all items inside localstorage
    localStorage.clear();
  }, []);
  return <Navigate to="/login" replace />
}
export default LogoutPage;