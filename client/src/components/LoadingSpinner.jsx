import React from "react";

const LoadingSpinner = ({ message = "Processing..." }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin"></div>
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
