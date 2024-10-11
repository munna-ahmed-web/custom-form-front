import http from "./http";

export const getData = (url) => {
  try {
    const response = http.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};

export const postData = (url, body) => {
  try {
    const response = http.post(url, body);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateData = async (url, body) => {
  try {
    const response = await http.patch(url, body);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteData = (url, selectedIds) => {
  try {
    const response = http.delete(url, {
      data: selectedIds,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
