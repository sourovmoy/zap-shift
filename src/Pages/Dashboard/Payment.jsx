import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import Loader from "../../Components/Loader/Loader";

const Payment = () => {
  const { parcelId } = useParams();
  const axios = useAxios();
  const { data: parcel, isLoading } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axios.get(`/parcel/${parcelId}`);
      return res.data.results;
    },
  });
  if (isLoading) {
    return <Loader />;
  }

  return <div>Parcel name = {parcel.parcelName}</div>;
};

export default Payment;
