import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import ButtonPri from "../../../Components/Button/ButtonPri";
import Swal from "sweetalert2";

const AddRider = () => {
  const axios = useAxios();
  const [selectedParcel, setSelectedParcel] = useState({});
  const { data: parcels = [], refetch: parcelRefetch } = useQuery({
    queryKey: ["parcels", "shipped"],
    queryFn: async () => {
      const result = await axios.get("/parcel?deliveryStatus=shipped");
      return result.data.results;
    },
  });

  const { data: rider = [] } = useQuery({
    enabled: !!selectedParcel?.senderDistrict,
    queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
    queryFn: async () => {
      const result = await axios.get(
        `/rider?status=approved&district=${selectedParcel?.senderDistrict}&workStatus=available`
      );
      return result.data.results;
    },
  });

  const handelAssign = (parcel) => {
    setSelectedParcel(parcel);
    document.getElementById("assignParcel").showModal();
  };
  const handelBook = (rider) => {
    const bookedInfo = {
      riderId: rider._id,
      riderEmail: rider.email,
      riderName: rider.name,
    };
    axios.patch(`/parcel/${selectedParcel._id}`, bookedInfo).then((res) => {
      if (res.data.modifiedCount) {
        parcelRefetch();
        document.getElementById("assignParcel").close()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Rider is assigned",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>SenderName</th>
              <th>Pick Up Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.senderName}</td>
                <td className="flex flex-col gap-1">
                  <span>{parcel.senderDistrict}</span>
                  <span>{parcel.senderAddress}</span>
                  <span> {parcel.senderPhone}</span>
                  <span> {parcel.trackingId}</span>
                </td>
                <td>
                  <ButtonPri
                    onClick={() => handelAssign(parcel)}
                    label={"Assign Riders"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog id="assignParcel" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Parcel :{selectedParcel?.parcelName}
          </h3>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Details</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rider.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center font-medium mt-10 py-5"
                    >
                      No rider available
                    </td>
                  </tr>
                ) : (
                  rider.map((r, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{r?.name}</td>
                      <td>
                        Location: {r?.district} <br />
                        Phone: {r?.phone}
                      </td>
                      <td>
                        <button
                          onClick={() => handelBook(r)}
                          className="btn btn-sm hover:bg-green-800"
                        >
                          Book
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddRider;
