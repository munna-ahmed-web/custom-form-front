import { getData, postData } from "../utils/apiService";

export const getComment = async (templateId) => {
  const url = `/comment?templateId=${templateId}`;
  try {
    const res = await getData(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const createComment = async (data) => {
  const url = "/comment/create";
  try {
    const res = await postData(url, data);
    return res;
  } catch (error) {
    throw error;
  }
};
