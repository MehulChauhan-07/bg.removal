import React from "react";

const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((dot) => (
          <div
            key={dot}
            className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
            style={{
              animationDelay: `${dot * 0.1}s`,
              animationDuration: "0.8s",
            }}
          ></div>
        ))}
      </div>
      <p className="mt-2 text-sm text-gray-500">Processing your image...</p>
    </div>
  );
};

export default LoadingAnimation;
