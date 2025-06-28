import React, { useState, useRef } from "react";
import ProcessingProgress from "./ProcessingProgress";
import ImageComparison from "./ImageComparison";

const DragDrop = () => {
  const [file, setFile] = useState(null);
  const [originalPreview, setOriginalPreview] = useState("");
  const [processedImage, setProcessedImage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    handleFile(selectedFile);
  };

  const handleFile = (selectedFile) => {
    setError("");
    setProcessedImage("");
    setFeedback("");

    if (!selectedFile) return;

    // Validate file type
    if (!selectedFile.type.match("image.*")) {
      setError("Please select a valid image file (JPEG, PNG, etc.)");
      return;
    }

    // Validate file size (10MB limit)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setFile(selectedFile);
    setFeedback(`Selected: ${selectedFile.name}`);

    // Create image preview
    const reader = new FileReader();
    reader.onload = () => {
      setOriginalPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleRemoveBackground = () => {
    if (!file) return;

    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      // For demo, we're just using the same image as "processed"
      // In a real app, you would send to backend and get processed image back
      setProcessedImage(originalPreview);
      setFeedback("Background removed successfully!");
      setIsProcessing(false);
    }, 3000);
  };

  const handleProcessingComplete = () => {
    // This would be called when processing is complete
    console.log("Processing completed");
  };

  const handleReset = () => {
    setFile(null);
    setOriginalPreview("");
    setProcessedImage("");
    setError("");
    setFeedback("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      {!originalPreview ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="p-3 rounded-full bg-blue-100">
              <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium">Drag & drop your image here</h3>
            <p className="text-sm text-gray-500">
              Support for JPG, PNG and GIF files. Max size 10MB.
            </p>
            <div className="relative">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInput}
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Upload image"
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Browse Files
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {isProcessing ? (
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-medium mb-2 text-center">
                Processing Your Image
              </h3>
              <ProcessingProgress
                isProcessing={isProcessing}
                onComplete={handleProcessingComplete}
              />
            </div>
          ) : processedImage ? (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-medium mb-4 text-center">Result</h3>
                <ImageComparison
                  originalImage={originalPreview}
                  processedImage={processedImage}
                />

                <div className="flex justify-center mt-4 space-x-3">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  >
                    Upload New Image
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    onClick={() => {
                      // Download logic would go here
                      alert("Downloading processed image...");
                    }}
                  >
                    Download Result
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Pro Tip</h4>
                <p className="text-sm text-blue-700">
                  For even better results, try our premium plan with HD
                  processing and edge refinement features.
                </p>
                <button className="mt-2 text-sm text-blue-600 underline">
                  Upgrade Now
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-medium mb-4 text-center">
                Ready to Process
              </h3>

              <div className="relative border rounded-lg overflow-hidden">
                <img
                  src={originalPreview}
                  alt="Selected image preview"
                  className="w-full object-contain max-h-64"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <p className="text-lg font-medium">
                      Ready to remove background
                    </p>
                    <p className="text-sm">
                      Click the button below to start processing
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-4 space-x-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                  Choose Different Image
                </button>
                <button
                  onClick={handleRemoveBackground}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Remove Background
                </button>
              </div>
            </div>
          )}

          {feedback && !isProcessing && !error && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
              {feedback}
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default DragDrop;
