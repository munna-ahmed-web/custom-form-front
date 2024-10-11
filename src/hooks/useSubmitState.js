import { useState } from "react";
import { postData } from "../utils/apiService";

const initialState = {
  loading: false,
  errorMessage: "",
  loginInfo: "",
};
const useSubmitState = () => {
  const [submitState, setSubmitState] = useState(initialState);

  const submitHandler = async (url, value) => {
    try {
      setSubmitState((prev) => {
        return {
          ...prev,
          loading: true,
          errorMessage: "",
        };
      });
      const response = await postData(url, value);
      setSubmitState((prev) => {
        return {
          ...prev,
          loading: false,
          errorMessage: "",
        };
      });
      return response;
    } catch (err) {
      setSubmitState((prev) => {
        return {
          ...prev,
          loading: false,
          errorMessage: err.response.data.message,
        };
      });
      throw err;
    }
  };

  return {
    submitState,
    setSubmitState,
    submitHandler,
  };
};

export default useSubmitState;
