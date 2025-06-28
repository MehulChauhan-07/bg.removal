import React, { useState, useRef, useEffect } from "react";

const ImageComparison = ({ originalImage, processedImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const calculatePosition = (clientX) => {
    if (!containerRef.current) return;

    const { left, width } = containerRef.current.getBoundingClientRect();
    const position = ((clientX - left) / width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    calculatePosition(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    calculatePosition(e.touches[0].clientX);
    e.preventDefault();
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-80 overflow-hidden border rounded-lg shadow-md"
    >
      {/* Processed image (full width) */}
      <img
        src={processedImage}
        alt="Processed image"
        className="absolute top-0 left-0 w-full h-full object-contain"
      />

      {/* Original image (partial width) */}
      <div
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={originalImage}
          alt="Original image"
          className="absolute top-0 left-0 w-full h-full object-contain"
        />
      </div>

      {/* Divider/slider */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg
            className="w-5 h-5 text-gray-800"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
              transform="rotate(45 10 10)"
            ></path>
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between p-2 bg-black bg-opacity-50 text-white text-xs">
        <span>Original</span>
        <span>Removed Background</span>
      </div>
    </div>
  );
};

export default ImageComparison;
