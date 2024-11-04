import { getData } from "../utils/apiService";
export const getUserInfoById = async (id) => {
  const url = `/usersIfo/${id}`;
  try {
    const res = await getData(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};
