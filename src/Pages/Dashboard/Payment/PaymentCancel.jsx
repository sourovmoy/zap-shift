import React from "react";
import { Link } from "react-router";
import ButtonPri from "../../../Components/Button/ButtonPri";

const PaymentCancel = () => {
  return (
    <div className="flex flex-col justify-center gap-5 items-center mt-10">
      <h2 className="text-3xl font-semibold">Payment Cancelled</h2>
      <Link to={"/dashboard/my-parcel"}>
        <ButtonPri label="Go Back" />
      </Link>
    </div>
  );
};

export default PaymentCancel;
