import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import Loader from "../../Components/Loader/Loader";
import ButtonPri from "../../Components/Button/ButtonPri";
import toast from "react-hot-toast";

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
  console.log(parcel);
  // createdAt: "2025-11-26T18:15:47.917Z";
  // deliveryInstruction: "Aspernatur velit rep";
  // parcelName: "Xerxes Livingston";
  // parcelType: "non-document";
  // parcelWeight: "56";
  // pickupInstruction: "Pariatur At ipsum l";
  // receiverAddress: "Amet ut perferendis";
  // receiverDistrict: "Select your District";
  // receiverEmail: "baxycyby@mailinator.com";
  // receiverName: "Doris Mcgee";
  // receiverPhone: "+1 (911) 909-6861";
  // receiverRegion: "Select your Region";
  // senderAddress: "Enim incididunt quis";
  // senderDistrict: "Sunamganj";
  // senderEmail: "sourovmmoysanju@gmail.com";
  // senderName: "Sourov Dash";
  // senderPhone: "+1 (792) 315-3772";
  // senderRegion: "Sylhet";
  // value: 2310;
  // _id: "692743d3fd7b491d5ee29085";

  const handelPayment = async () => {
    const paymentInfo = {
      value: parcel.value,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
      receiverName: parcel.receiverName,
      receiverAddress: parcel.receiverAddress,
      receiverPhone: parcel.receiverPhone,
    };

    try {
      const res = await axios.post("/create-checkout-session", paymentInfo);
      window.location.href = res.data.url;
      // or
      // window.location.assign(res.data.url);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex justify-center my-10 font-medium">
      <div className="flex flex-col gap-8 text-center justify-center items-center shadow-2xl p-5 rounded-2xl">
        <p>Parcel name = {parcel.parcelName}</p>
        <p>Parcel cost = {parcel.value}</p>
        <ButtonPri onClick={handelPayment} label="Pay" className="w-full" />
      </div>
    </div>
  );
};

export default Payment;
