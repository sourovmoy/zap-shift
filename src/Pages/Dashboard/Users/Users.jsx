import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import { FaUser, FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Users = () => {
  const [search, setSearch] = useState("");
  const axios = useAxios();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["user", search],
    queryFn: async () => {
      const result = await axios
        .get(`/user?searchUser=${search}`)
        .then((res) => res.data);

      return result.results;
    },
  });

  const handelAdmin = (item, check) => {
    const update = { role: check };
    Swal.fire({
      title: "Are you sure?",
      text: `You want to make ${item.displayName} as ${check}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Make ${check}`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.patch(`/user/${item._id}/role`, update).then((res) => {
          if (res.data.result.modifiedCount) {
            toast.success(`User role updated to ${check} successfully`);
          }
          refetch();
        });

        Swal.fire({
          title: "Congratulations!",
          text: `${item.displayName} is now ${check}`,
          icon: "success",
        });
      }
    });
  };
  const handelSelect = (item) => {
    handelAdmin(item, "admin");
  };
  const handelReject = (item) => {
    handelAdmin(item, "user");
  };
  console.log(search);

  return (
    <div>
      <div className="flex justify-center items-center">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            required
            placeholder="Search User"
          />
        </label>
      </div>
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
                    {user?.role === "admin" ? (
                      <button
                        onClick={() => handelReject(user)}
                        className="btn btn-circle relative group bg-red-700"
                      >
                        <FiShieldOff size={16} />
                        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2  hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
                          Reject Admin
                        </span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handelSelect(user)}
                        className="btn btn-circle relative group bg-green-700"
                      >
                        <FaUserShield size={16} />
                        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2  hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
                          Make Admin
                        </span>
                      </button>
                    )}
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
