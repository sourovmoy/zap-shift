import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div className="flex items-end text-3xl font-semibold">
        <img src={logo} alt="" />
        <p className=" -ms-4">ZapShift</p>
      </div>
    </Link>
  );
};

export default Logo;
