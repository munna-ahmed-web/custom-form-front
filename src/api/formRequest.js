import { getData, postData } from "../utils/apiService";

export const getFormsByTemplate = async (id) => {
  const url = `/form/${id}`;
  try {
    const res = await getData(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getFormsByUserId = async (id) => {
  const url = `/form/user/${id}`;
  try {
    const res = await getData(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createForm = async (data) => {
  const url = "/form/create";
  try {
    const res = await postData(url, data);
    return res;
  } catch (error) {
    throw error;
  }
};
