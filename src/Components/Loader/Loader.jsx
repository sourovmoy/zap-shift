import React from "react";
import { ClimbingBoxLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ClimbingBoxLoader color="green" />
    </div>
  );
};

export default Loader;
