import React, { useState, useRef, useEffect } from "react";

const BeforeAfterSlider = ({ originalImage, processedImage, altText }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const calculateSliderPosition = (clientX) => {
    if (sliderRef.current) {
      const { left, width } = sliderRef.current.getBoundingClientRect();
      let position = ((clientX - left) / width) * 100;
      position = Math.min(Math.max(position, 0), 100);
      setSliderPosition(position);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      calculateSliderPosition(e.clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && e.touches[0]) {
      calculateSliderPosition(e.touches[0].clientX);
      e.preventDefault(); // Prevent scrolling while dragging
    }
  };

  const handleKeyDown = (e) => {
    // Arrow key navigation for accessibility
    if (e.key === "ArrowLeft") {
      setSliderPosition((prev) => Math.max(prev - 5, 0));
    } else if (e.key === "ArrowRight") {
      setSliderPosition((prev) => Math.min(prev + 5, 100));
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <div
      className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-xl shadow-lg"
      ref={sliderRef}
      aria-label="Before and after image comparison slider"
    >
      <div
        className="relative w-full"
        style={{ paddingBottom: "56.25%" /* 16:9 aspect ratio */ }}
      >
        {/* Processed (After) Image - Full Width */}
        <img
          src={processedImage}
          alt={`Processed ${altText || "image"}`}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Original (Before) Image - Partial Width Based on Slider */}
        <div
          className="absolute top-0 left-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={originalImage}
            alt={`Original ${altText || "image"}`}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{ left: `${sliderPosition}%`, marginLeft: "-0.5px" }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          tabIndex={0}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={sliderPosition}
          aria-label="Slide to compare before and after"
          onKeyDown={handleKeyDown}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg focus:ring-2 focus:ring-blue-300 focus:outline-none">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
              <path
                d="M15.41 16.59L10.83 12 15.41 7.41 14 6l-6 6 6 6 1.41-1.41z"
                transform="scale(-1, 1) translate(-24, 0)"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-between p-3 bg-white dark:bg-gray-800">
        <span className="px-3 py-1 text-sm font-medium bg-gray-200 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200">
          Original
        </span>
        <span className="px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 rounded-full text-blue-800 dark:text-blue-200">
          Background Removed
        </span>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
