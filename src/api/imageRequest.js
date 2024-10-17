import axios from "axios";
import toast from "react-hot-toast";
const preset = import.meta.env.VITE_PRESET;
export const uploadImageToCloudinary = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", preset);
  try {
    const loadingId = toast.loading("uploading...");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dkwjkajc4/image/upload",
      formData
    );
    toast.dismiss(loadingId);
    toast.success("Success");
    return res.data.secure_url;
  } catch (err) {
    toast.dismiss(loadingId);
    toast.error("Something went wrong");
    console.error("Error uploading the image:", err);
  }
};
