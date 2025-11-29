import React, { useEffect, useState } from "react";
import ButtonPri from "../../../Components/Button/ButtonPri";
import { Link, useSearchParams } from "react-router";
import useAxios from "../../../Hooks/useAxios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState({});
  const axios = useAxios();
  const sessionId = searchParams.get("session_id");
  useEffect(() => {
    if (sessionId) {
      axios.patch(`/session-status?session_id=${sessionId}`).then((res) => {
        setPaymentStatus({
          transactionId: res.data.transactionId,
          trackingId: res.data.trackingId,
        });
      });
    }
  }, [sessionId, axios]);

  return (
    <div className="flex flex-col justify-center gap-5 items-center mt-10">
      <h2 className="text-3xl font-semibold">Payment Successful</h2>
      <p>
        Your transaction ID is:{" "}
        <span className="font-semibold text-2xl">
          {paymentStatus.transactionId}
        </span>
      </p>
      <p>
        Your tracking ID is:{" "}
        <span className="font-semibold text-2xl">
          {paymentStatus.trackingId}
        </span>
      </p>
      <Link to={"/dashboard/my-parcel"}>
        <ButtonPri label="Go Back" />
      </Link>
    </div>
  );
};

export default PaymentSuccess;
