// components/ui/card.js
import React from "react";

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white border rounded-lg shadow-md p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="space-y-4">{children}</div>;
};
