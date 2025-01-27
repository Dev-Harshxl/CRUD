import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/items";

export const getItems = () => {
  return axios
    .get(API_BASE_URL)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching items:", error);
      throw error;
    });
};

export const deleteItem = async (id) => {
  return await axios
    .delete(`${API_BASE_URL}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error deleting item:", error);
      throw error;
    });
};
export const updateItem = (id, item) => {
  return axios
    .put(`${API_BASE_URL}/${id}`, item)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating item:", error);
      throw error;
    });
};
export const createItem = async (formData) => {
  try {
    const response = await axios.post("http://localhost:8080/api/items", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensure this header is set
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in createItem API:", error);
    throw error;
  }
};


