import axios from "axios";

// Base API URL (should match backend, e.g., http://localhost:8000/api)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// Mirror client config from authService: send cookies and JSON content-type
const client = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Admin Manager CRUD APIs
export const createManager = async (payload) => {
  try {
    const { data } = await client.post(`/admin/create-manager`, payload);
    return data;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    throw err;
  }
};

export const getAllManagers = async () => {
  try {
    const { data } = await client.get(`/admin/managers`);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getManagerById = async (id) => {
  try {
    const { data } = await client.get(`/admin/managers/${id}`);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateManager = async (id, payload) => {
  try {
    const { data } = await client.put(`/admin/managers/${id}`, payload);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteManager = async (id) => {
  try {
    const { data } = await client.delete(`/admin/managers/${id}`);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  createManager,
  getAllManagers,
  getManagerById,
  updateManager,
  deleteManager,
};
