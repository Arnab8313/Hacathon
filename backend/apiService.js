import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchInventory = async () => {
  const response = await axios.get(`${API_URL}/api/inventory`);
  return response.data;
};

export const addItem = async (item) => {
  const response = await axios.post(`${API_URL}/api/inventory`, item);
  return response.data;
};

export const deleteItem = async (id) => {
  const response = await axios.delete(`${API_URL}/api/inventory/${id}`);
  return response.data;
};