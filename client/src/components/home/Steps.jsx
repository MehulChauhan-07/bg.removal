import React from "react";
import { assets } from "../../assets/assets";

const Steps = () => {
  return (
    <div className="mx-4 lg:mx-44 py-20 xl:py-40">
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">
        Steps to Remove Background Image in Seconds
      </h1>

      <div className="flex items-start flex-wrap gap-4 mt-16 xl:mt-24 justify-center">
        <div
          className="flex items-start gap-4 bg-white dark:bg-gray-700 border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500"
          role="region"
          aria-label="Upload Step"
        >
          <img
            src={assets.upload_icon}
            alt="Upload Icon"
            className="w-10 h-10"
          />
          <div>
            <p className="text-xl font-medium">Upload Image</p>
            <p className="text-sm text-neutral-500 mt-1">
              Select an image file to upload and start processing instantly.
            </p>
          </div>
        </div>

        <div
          className="flex items-start gap-4 bg-white dark:bg-gray-700 border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500"
          role="region"
          aria-label="Remove Background Step"
        >
          <img
            src={assets.remove_bg_icon}
            alt="Remove Background Icon"
            className="w-10 h-10"
          />
          <div>
            <p className="text-xl font-medium">Remove Background</p>
            <p className="text-sm text-neutral-500 mt-1">
              Our AI tool removes the background with high accuracy.
            </p>
          </div>
        </div>

        <div
          className="flex items-start gap-4 bg-white dark:bg-gray-700 border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500"
          role="region"
          aria-label="Download Image Step"
        >
          <img
            src={assets.download_icon}
            alt="Download Icon"
            className="w-10 h-10"
          />
          <div>
            <p className="text-xl font-medium">Download Image</p>
            <p className="text-sm text-neutral-500 mt-1">
              Save your processed image in your desired format.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
