import { postData } from "../utils/apiService";
export const createTicket = async (data) => {
  try {
    const response = await postData("/ticket/create", data);
    return response;
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error;
  }
};
