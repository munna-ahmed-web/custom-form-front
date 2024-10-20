import toast from "react-hot-toast";
import { deleteData, getData, postData, updateData } from "../utils/apiService";

export const searchTemplates = async (searchTerm = "") => {
  const url = `/searchTemplates/?search=${searchTerm}`;
  try {
    const res = await getData(url);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getTemplates = async () => {
  const url = `/template`;
  try {
    const res = await getData(url);
    return res.data;
  } catch (error) {
    toast.error("Something went wrong in getting template");
    throw error;
  }
};

export const getTemplateById = async (id) => {
  const url = `/template/${id}`;
  try {
    const res = await getData(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getTemplateByUserId = async (userId) => {
  const url = `/template/user/${userId}`;
  try {
    const res = await getData(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createTemplate = async (data) => {
  const url = "/template";
  try {
    const res = await postData(url, data);
    return res;
  } catch (error) {
    toast.error("Something went wrong in create template");
    throw error;
  }
};

export const updateTemplate = async (id, data) => {
  const url = `/template/${id}`;
  try {
    const res = await updateData(url, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteTemplate = async (id) => {
  const url = `/template/${id}`;
  try {
    const res = await deleteData(url);
    return res;
  } catch (error) {
    throw error;
  }
};
