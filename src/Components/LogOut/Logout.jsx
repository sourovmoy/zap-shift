import React from "react";
import { useAuth } from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import ButtonPri from "../Button/ButtonPri";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();
  const { user, signOutFunc } = useAuth();
  const handelLogOut = () => {
    try {
      signOutFunc().then(() => {
        toast.success("Log out");
        navigate("/");
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="outline-3 rounded-full outline-lime-500"
      >
        <img
          className="rounded-full h-11 w-11"
          src={user?.photoURL}
          alt=""
          referrerPolicy="no-referrer"
        />
      </div>
      <ul
        tabIndex="-1"
        className="dropdown-content menu bg-base-100 rounded-box z-10 p-2 shadow-sm font-semibold "
      >
        <li>
          <p>{user?.displayName}</p>
        </li>
        <li>
          <p>{user?.email}</p>
        </li>
        <li>
          <ButtonPri onClick={handelLogOut} label={"Logout"} />
        </li>
      </ul>
    </div>
  );
};

export default Logout;
