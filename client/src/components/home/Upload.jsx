import React, { useRef, useState } from "react";
import { assets } from "../../assets/assets";
import { useImageContext } from "../../context/ImageContext";
import FeedbackToast from "../FeedbackToast";

const Upload = () => {
  const { handleImageUpload } = useImageContext();
  const fileInputRef = useRef(null);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("info");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validate file type
    if (!file.type.match("image.*")) {
      setError("Please upload an image file (JPEG, PNG, etc.)");
      setToastMessage("Please upload an image file");
      setToastType("error");
      setShowToast(true);
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image size should be less than 10MB");
      setToastMessage("Image size should be less than 10MB");
      setToastType("error");
      setShowToast(true);
      return;
    }

    // Clear any previous errors
    setError(null);

    // Show success toast
    setToastMessage("Image uploaded successfully!");
    setToastType("success");
    setShowToast(true);

    // Handle the image upload
    handleImageUpload(file);
  };

  return (
    <div>
      {/* Title */}
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-6 md:py-16">
        See the magic of AI in action! Try it now
      </h1>

      <div className="text-center mb-24">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          id="upload2"
          hidden
        />
        <label
          className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700"
          htmlFor="upload2"
        >
          <img width={20} src={assets.upload_btn_icon} alt="" />
          <p className="text-white text-sm">Upload your Image</p>
        </label>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {showToast && (
        <FeedbackToast
          message={toastMessage}
          type={toastType}
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default Upload;
