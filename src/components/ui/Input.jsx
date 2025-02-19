// components/ui/input.js
import React from "react";

export const Input = ({
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    />
  );
};
