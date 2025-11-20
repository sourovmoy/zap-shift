import React from "react";
import { useAuth } from "../Hooks/useAuth";
import { ClimbingBoxLoader } from "react-spinners";
import { Navigate, useLocation } from "react-router";

const PrivetRoute = ({ children }) => {
  const location = useLocation();
  const { user, loader } = useAuth();
  if (loader) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ClimbingBoxLoader color="green" />
      </div>
    );
  }
  if (!user) {
    return <Navigate to={"/login"} state={location.pathname}></Navigate>;
  }
  return <div>{children}</div>;
};

export default PrivetRoute;
