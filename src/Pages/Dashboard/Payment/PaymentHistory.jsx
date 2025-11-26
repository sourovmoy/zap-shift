import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuth } from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";

const PaymentHistory = () => {
  // /payment-history?email=sanjubabasourov@gmail.com
  const { user } = useAuth();
  const axios = useAxios();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axios.get(`/payment-history?email=${user?.email}`);
      console.log(payments);

      return result.data.results;
    },
  });

  return (
    <div>
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3">Parcel Info</th>
            <th className="px-4 py-3">Recipient Info</th>
            <th className="px-4 py-3">Tracking Number</th>
            <th className="px-4 py-3">Payment Info</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((item) => (
            <tr key={item._id} className="border-b">
              <td className="px-4 py-3">{item.parcelName}</td>

              <td className="px-4 py-3">
                <div className="font-medium">{item.recipientName}</div>
                <div className="text-sm text-gray-600">
                  {item.recipientAddress}
                </div>
                <div className="text-sm text-gray-600">
                  {item.recipientPhone}
                </div>
              </td>

              <td className="px-4 py-3 font-semibold">{item.trackingId}</td>

              <td className="px-4 py-3">
                ${item.amount}{" "}
                <span className="text-green-600">({item.paymentStatus})</span>
              </td>

              <td className="px-4 py-3">
                <button className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
