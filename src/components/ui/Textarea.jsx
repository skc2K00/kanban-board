// components/ui/textarea.js
import React from "react";

export const Textarea = ({ value, onChange, placeholder, className = "" }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    />
  );
};
