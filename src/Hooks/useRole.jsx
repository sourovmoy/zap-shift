import React from "react";
import { useAuth } from "./useAuth";
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const { data: role = "user", isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const result = await axios
        .get(`/user/${user?.email}/role`)
        .then((res) => res.data);
      return result.role;
    },
  });
  return { role, isLoading };
};

export default useRole;
