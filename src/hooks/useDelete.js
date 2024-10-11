import { useState } from "react";
import { deleteData } from "../utils/apiService";

const initialState = {
  loading: false,
  errorMessage: "",
  data: [],
};
const useDelete = () => {
  const [deleteState, setDeleteState] = useState(initialState);

  const deleteHandler = async (url) => {
    try {
      setDeleteState((prev) => {
        return {
          ...prev,
          loading: true,
          errorMessage: "",
        };
      });
      const { data } = await deleteData(url);
      setDeleteState((prev) => {
        return {
          ...prev,
          loading: false,
          errorMessage: "",
        };
      });
      return data;
    } catch (err) {
      setDeleteState((prev) => {
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
    deleteState,
    setDeleteState,
    deleteHandler,
  };
};

export default useDelete;
