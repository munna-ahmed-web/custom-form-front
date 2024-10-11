import { useState } from "react";
import { getData } from "../utils/apiService";

const initialState = {
  loading: false,
  errorMessage: "",
  data: [],
};
const useFetchState = () => {
  const [dataState, setDataState] = useState(initialState);

  const getDataHandler = async (url) => {
    try {
      setDataState((prev) => {
        return {
          ...prev,
          loading: true,
          errorMessage: "",
        };
      });
      const { data } = await getData(url);
      setDataState((prev) => {
        return {
          ...prev,
          loading: false,
          errorMessage: "",
        };
      });
      return data;
    } catch (err) {
      setDataState((prev) => {
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
    dataState,
    setDataState,
    getDataHandler,
  };
};

export default useFetchState;
