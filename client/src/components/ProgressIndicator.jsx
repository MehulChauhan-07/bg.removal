import React, { useEffect, useState } from "react";

const ProgressIndicator = ({ isProcessing, progress, currentStep }) => {
  const [animationProgress, setAnimationProgress] = useState(0);

  const steps = [
    {
      id: 1,
      name: "Uploading",
      description: "Transferring your image to our servers",
    },
    {
      id: 2,
      name: "Analyzing",
      description: "Detecting objects and image details",
    },
    {
      id: 3,
      name: "Processing",
      description: "Removing background using AI algorithms",
    },
    {
      id: 4,
      name: "Finalizing",
      description: "Preparing your image for download",
    },
  ];

  useEffect(() => {
    if (isProcessing) {
      setAnimationProgress(progress);
    } else {
      setAnimationProgress(0);
    }
  }, [isProcessing, progress]);

  if (!isProcessing && progress === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto my-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      {/* Progress bar */}
      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
          style={{ width: `${animationProgress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>

      <p className="text-center font-medium text-blue-600 dark:text-blue-400 mt-2">
        {Math.round(progress)}% Complete
      </p>

      {/* Steps display */}
      <div className="mt-6 space-y-4">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-start space-x-3 transition-opacity duration-300 ${
              currentStep >= step.id ? "opacity-100" : "opacity-50"
            }`}
          >
            <div
              className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${
                currentStep > step.id
                  ? "bg-green-500 text-white"
                  : currentStep === step.id
                  ? "bg-blue-500 text-white animate-pulse"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              }`}
            >
              {currentStep > step.id ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              ) : (
                step.id
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 dark:text-white">
                {step.name}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
