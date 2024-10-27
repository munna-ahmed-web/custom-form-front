import { getData, postData, updateData } from "../utils/apiService";

export const getFormsByTemplate = async (id) => {
  const url = `/form/template/${id}`;
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
export const getFormById = async (id) => {
  const url = `/form/${id}`;
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
export const updateForm = async (id, payload) => {
  const url = `/form/update/${id}`;
  try {
    const res = await updateData(url, payload);
    return res;
  } catch (error) {
    throw error;
  }
};
