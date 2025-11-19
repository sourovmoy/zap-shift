import React from "react";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Logo from "../Components/Logo/Logo";
import { NavLink } from "react-router";

const Footer = () => {
  const links = (
    <>
      <li>
        <NavLink to={"/services"}>Services</NavLink>
      </li>
      <li>
        <NavLink to={"/coverage"}>Coverage</NavLink>
      </li>
      <li>
        <NavLink to={"/about-us"}>About Us</NavLink>
      </li>
      <li>
        <NavLink to={"/pricing"}>Pricing</NavLink>
      </li>
      <li>
        <NavLink to={"/be-a-ride"}>Be a Rider</NavLink>
      </li>
    </>
  );
  return (
    //
    <footer className="bg-black text-white py-10 rounded-3xl mt-20">
      <div className="max-w-6xl mx-auto text-center px-4">
        {/* LOGO */}
        <h1 className="text-2xl font-bold flex justify-center items-center gap-1">
          <Logo />
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-300 max-w-xl mx-auto mt-2 text-sm">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        {/* LINE */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* NAVIGATION */}
        <ul className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
          {links}
        </ul>

        {/* LINE */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* SOCIAL ICONS */}
        <div className="flex justify-center items-center gap-6 text-xl">
          <FaLinkedin className="hover:text-lime-400 duration-200" />
          <RxCross2 className="hover:text-lime-400 duration-200" />
          <FaFacebook className="hover:text-lime-400 duration-200" />
          <FaYoutube className="hover:text-lime-400 duration-200" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
