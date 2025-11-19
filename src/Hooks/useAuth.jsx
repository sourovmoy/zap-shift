import { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};
