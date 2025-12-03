import React from "react";
import Logo from "../Components/Logo/Logo";
import { NavLink } from "react-router";
import ButtonPri from "../Components/Button/ButtonPri";
import { useAuth } from "../Hooks/useAuth";
import { ImSpinner9 } from "react-icons/im";
import Logout from "../Components/LogOut/Logout";

const Navbar = () => {
  const { user, loader } = useAuth();

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/services"}>Services</NavLink>
      </li>
      <li>
        <NavLink to={"/coverage"}>Coverage</NavLink>
      </li>
      {/* <li>
        <NavLink to={"/about-us"}>About Us</NavLink>
      </li> */}
      <li>
        <NavLink to={"/send-parcel"}>Send Parcel</NavLink>
      </li>
      {/* <li>
        <NavLink to={"/pricing"}>Pricing</NavLink>
      </li> */}

      <li>
        <NavLink to={"/dashboard"}>Dashboard</NavLink>
      </li>

      {user && (
        <li>
          <NavLink to={"/be-a-ride"}>Be a Rider</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="">
      <div className="navbar bg-base-100 shadow-sm rounded-2xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content text-base-400 bg-white rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-medium text-base-400">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          <ButtonPri to={"/be-a-ride"} label={"Ride"} className="mr-3" />
          {loader ? (
            <ImSpinner9 className="animate-spin" />
          ) : user ? (
            <div className="flex items-center gap-5">
              <Logout />
            </div>
          ) : (
            <ButtonPri to={"/login"} label={"Login"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
