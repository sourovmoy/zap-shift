import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuth } from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import Swal from "sweetalert2";
import { Link } from "react-router";
import Loader from "../../Components/Loader/Loader";

const MyParcel = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const {
    data: parcels = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axios.get(`/parcel?email=${user?.email}`);
      return result.data.results;
    },
  });
  const handelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/parcel/${id}`).then((res) => {
          if (res.data.results.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white min-h-screen rounded-2xl">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.value}</td>
                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <p className="text-green-600 font-medium">Paid</p>
                  ) : (
                    <Link
                      to={`/dashboard/payment/${parcel?._id}`}
                      className="btn-primary p-2"
                    >
                      Pay
                    </Link>
                  )}
                </td>
                <td className=" flex items-center hover:">
                  <button className="btn relative group btn-circle">
                    <FcViewDetails />
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2  hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
                      View details
                    </span>
                  </button>
                  <button className="btn btn-circle mx-2 relative group ">
                    <FaEdit />
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2  hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
                      Edit
                    </span>
                  </button>
                  <button
                    onClick={() => handelDelete(parcel._id)}
                    className="btn btn-circle relative group"
                  >
                    <FaTrash />
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2  hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
                      Delete
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcel;
