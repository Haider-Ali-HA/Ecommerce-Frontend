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

export const getAllManagers = async (page = 1, limit = 10) => {
  try {
    const { data } = await client.get(
      `/admin/managers?page=${page}&limit=${limit}`
    );
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

  // export const getManagersByStatus = async (status, page = 1, limit = 10) => {
  //   console.log("Fetching managers by status:", status);
  //   try {
  //     // Backend exposes a dedicated route for status filtering: /admin/managers/status?status=...
  //     const { data } = await client.get(
  //       `/admin/managers/status?status=${status}&page=${page}&limit=${limit}`
  //     );
  //     console.log("Fetched data:", data);
  //     return data;
  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // };

export const searchManagersData = async (query,status, page = 1, limit = 10) => {
  console.log("Searching managers with query:", query, "and status:", status);
  try {
    const { data } = await client.get(
      `/admin/managers/search?query=${query}&status=${status}&page=${page}&limit=${limit}`
    );
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
  searchManagersData,
};
