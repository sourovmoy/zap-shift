import React from "react";
import useRole from "../Hooks/useRole";
import Loader from "../Components/Loader/Loader";
import Error from "../Components/Error/Error";

const AdminRoute = ({ children }) => {
  const { role, isLoading } = useRole();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }
  if (role !== "admin") {
    return <Error />;
  }
  return children;
};

export default AdminRoute;
