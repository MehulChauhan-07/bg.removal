import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [credit, setCredit] = useState(false);
  const [image, setImage] = useState(false);
  const [resultImage, setResultImage] = useState(false);

  // Use VITE_BACKEND_URL with fallback
  const rawBackendUrl = import.meta.env.VITE_BACKEND_URL;
  const backendUrl = rawBackendUrl ?? "http://localhost:3000";
  console.log("Using backendUrl:", backendUrl);

  const navigate = useNavigate();

  const { getToken } = useAuth();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const loadCreditData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backendUrl + `/api/user/credit`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data && data.success) {
        setCredit(data.credit);
        console.log("Credit data loaded:", data.credit);
      }
    } catch (error) {
      console.error("Error fetching credit data:", error);
      toast.error("Failed to load credit data. Please try again later.");
    }
  };

  const removeBg = async (imageFile) => {
    try {
      if (!isSignedIn) {
        toast.error("You must be signed in to remove background.");
        return openSignIn();
      }

      setImage(imageFile);
      setResultImage(false); // Reset result image
      navigate("/result");

      const token = await getToken();
      const formData = new FormData();
      // Ensure field name matches exactly what the server expects in multer.middleware.js
      imageFile && formData.append("image", imageFile);

      // Add logging to see what's in the formData
      console.log("FormData details:", {
        fileName: imageFile.name,
        fileType: imageFile.type,
        fileSize: imageFile.size,
      });
      console.log("Making API call to:", backendUrl + `/api/image/remove-bg`);

      const { data } = await axios.post(
        backendUrl + `/api/image/remove-bg`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data && data.success) {
        setResultImage(data.resultImage);
        data.creditBalance && setCredit(data.creditBalance);
        toast.success("Background removed successfully!");
      } else {
        toast.error(data.error || "Failed to remove background.");
        data.creditBalance && setCredit(data.creditBalance);
        if (data.creditBalance === 0) {
          toast.error("You have no credits left. Please purchase more.");
          navigate("/pricing");
        }
      }
    } catch (error) {
      console.error("Error removing background:", error);
      toast.error("Failed to remove background. Please try again later.");
    }
  };
  const value = {
    credit,
    setCredit,
    loadCreditData,
    image,
    setImage,
    removeBg,
    resultImage,
    setResultImage,
    backendUrl,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
