import { postData } from "../utils/apiService";

export const createSaleForce = async (data) => {
  const url = "/salesforce/create";
  try {
    const res = await postData(url, data);
    return res;
  } catch (error) {
    throw error;
  }
};
