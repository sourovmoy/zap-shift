import React from "react";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router";

const Logo = () => {
  return (
    <Link className="flex items-end text-2xl sm:text-3xl font-semibold">
      <img src={logo} alt="" />
      <p className=" -ms-4">ZapShift</p>
    </Link>
  );
};

export default Logo;
