import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:5000/api', // Updated base URL to include /api
  headers: {
    'Content-Type': 'application/json',
  },
});

export const initiatePayment = async (paymentData: any) => {
  try {
    const response = await apiClient.post('/payments/initiate', paymentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchInventory = async () => {
  try {
    const response = await apiClient.get('/inventory');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addItem = async (itemData: any) => {
  try {
    const response = await apiClient.post('/inventory', itemData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateItem = async (itemId: number, itemData: any) => {
  try {
    const response = await apiClient.put(`/inventory/${itemId}`, itemData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteItem = async (itemId: number) => {
  try {
    const response = await apiClient.delete(`/inventory/${itemId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};