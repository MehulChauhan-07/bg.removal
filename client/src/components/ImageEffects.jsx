import React, { useState } from "react";

const ImageEffects = ({ image, onApply }) => {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);

  const applyEffects = () => {
    // In a real implementation, this would process the image with the effects
    // For now, we just return the image unchanged
    onApply(image);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h4 className="font-medium text-lg mb-4">Enhance Your Image</h4>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brightness: {brightness}%
          </label>
          <input
            type="range"
            min="50"
            max="150"
            value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contrast: {contrast}%
          </label>
          <input
            type="range"
            min="50"
            max="150"
            value={contrast}
            onChange={(e) => setContrast(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Saturation: {saturation}%
          </label>
          <input
            type="range"
            min="0"
            max="200"
            value={saturation}
            onChange={(e) => setSaturation(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <button
          onClick={applyEffects}
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Apply Effects
        </button>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Enhance your image before removing the background for best results
      </div>
    </div>
  );
};

export default ImageEffects;
