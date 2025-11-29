import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../../Hooks/useAxios";
import { MdOutlineRemoveCircle } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import toast from "react-hot-toast";

const RiderRequest = () => {
  const axios = useAxios();
  const { data = [], refetch } = useQuery({
    queryKey: ["riderRequests", "pending"],
    queryFn: async () => {
      const result = await axios.get("/rider").then((res) => res.data);
      return result.results;
    },
  });

  const updateStatus = (item, status) => {
    const update = { status: status, email: item.email };
    axios.patch(`/rider/${item._id}`, update).then((res) => {
      if (res.data.results.modifiedCount) {
        toast.success(`Rider ${status} successfully`);
      }
      refetch();
    });
  };

  const handelAccept = (item) => {
    updateStatus(item, "approved");
  };

  const handelReject = (item) => {
    updateStatus(item, "rejected");
  };

  return (
    <div>
      <div className="p-5 shadow-2xl rounded-lg">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">District</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item) => (
              <tr
                key={item._id}
                className="border-b shadow-sm hover:bg-gray-50 hover:scale-102"
              >
                <td className="px-4 py-3">{item.name}</td>

                <td className="px-4 py-3 ">
                  <div className="font-medium">{item.email}</div>
                  <div className="font-medium">{item.phone}</div>
                  <div className="font-medium">{item.nid}</div>
                </td>

                <td className="px-4 py-3 font-semibold">{item.district}</td>

                <td className="px-4 py-3">
                  <span
                    className={`text-green-600 ${
                      item.status === "approved"
                        ? "text-green-500"
                        : item.status === "rejected"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    ({item.status})
                  </span>
                </td>

                <td className="px-4 py-5 flex justify-center items-center gap-2">
                  <button
                    onClick={() => handelAccept(item)}
                    className="px-2 py-2 rounded bg-gray-100 hover:bg-gray-200 flex items-center gap-1"
                  >
                    Accept <IoAddCircle />
                  </button>
                  <button
                    onClick={() => handelReject(item)}
                    className="px-2 py-2 rounded bg-gray-100 hover:bg-gray-200 flex items-center gap-1"
                  >
                    Reject <MdOutlineRemoveCircle />
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

export default RiderRequest;
