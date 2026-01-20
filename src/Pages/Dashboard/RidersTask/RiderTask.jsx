import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuth } from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";

const RiderTask = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const { data: tasks = [] } = useQuery({
    queryKey: ["parcel", user.email, "assigned"],
    queryFn: async () => {
      const result = await axios(
        `/parcel/rider?email=${user.email}&deliveryStatus=assigned`,
      );
      return result.data.results;
    },
  });
  console.log(tasks);

  return <div>rider task</div>;
};

export default RiderTask;
