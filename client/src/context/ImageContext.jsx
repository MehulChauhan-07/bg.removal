import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const ImageContext = createContext();

export const useImageContext = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageEffects, setImageEffects] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
  });
  const navigate = useNavigate();

  const handleImageUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target.result);

        // Simulate processing the image (in a real app, you'd send to backend)
        setIsProcessing(true);
        setTimeout(() => {
          setProcessedImage(e.target.result); // In a real app, this would be the result from your API
          setIsProcessing(false);
          navigate("/result");
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyImageEffects = (effects) => {
    setImageEffects(effects);
    // In a real app, you would apply these effects to the image
  };

  const resetImages = () => {
    setOriginalImage(null);
    setProcessedImage(null);
  };

  return (
    <ImageContext.Provider
      value={{
        originalImage,
        processedImage,
        isProcessing,
        imageEffects,
        handleImageUpload,
        applyImageEffects,
        resetImages,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};
