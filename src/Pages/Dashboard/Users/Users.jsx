import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../../Hooks/useAxios";
import { FaUser, FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";

const Users = () => {
  const axios = useAxios();
  const { data: users = [] } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const result = await axios.get("/user").then((res) => res.data);
      return result.results;
    },
  });
  console.log(users);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          {user?.photoURL ? (
                            <img src={user?.photoURL} alt={"user image"} />
                          ) : (
                            <FaUser size={24} />
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user?.displayName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user?.email}</td>
                  <td>{user?.role}</td>
                  <th className="flex gap-2">
                    <button className="btn btn-circle relative group">
                      <FaUserShield size={16} />
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2  hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
                        Make Admin
                      </span>
                    </button>
                    <button className="btn btn-circle relative group">
                      <FiShieldOff size={16} />
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2  hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
                        Reject Admin
                      </span>
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
