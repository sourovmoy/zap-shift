import React from "react";
import { Link } from "react-router";

const ButtonPri = ({
  label,
  to,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}) => {
  const baseClasses = `px-5 py-2 rounded-lg text-center font-bold text-[16px] transition-all duration-200 
        ${
          disabled
            ? "bg-lime-600 cursor-not-allowed"
            : "bg-[#caeb66] hover:bg-green-600 hover:scale-102 text-green-900"
        } 
        ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {label}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {label}
    </button>
  );
};

export default ButtonPri;
