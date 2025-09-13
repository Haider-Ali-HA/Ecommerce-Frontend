import axios from "axios";

// Base API URL (should match backend, e.g., http://localhost:8000/api)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const client = axios.create({
  baseURL: API_URL,
  withCredentials: true, // send/receive cookies
  headers: { "Content-Type": "application/json" },
});

const extractError = (err) => {
  const data = err?.response?.data;
  if (typeof data === "string") return data;
  return data?.message || err.message || "Request failed";
};

// Auth APIs
export const registerUser = async (payload) => {
  try {
    const { data } = await client.post(`/auth/register`, payload);
    return data;
  } catch (err) {
    throw new Error(extractError(err));
  }
};

export const loginUser = async (payload) => {
  try {
    const { data } = await client.post(`/auth/login`, payload);
    return data;
  } catch (err) {
    throw new Error(extractError(err));
  }
};

export const verifyUser = async (payload) => {
  try {
    const { data } = await client.post(`/auth/verify`, payload);
    return data;
  } catch (err) {
    throw new Error(extractError(err));
  }
};

export const getProfile = async () => {
  try {
    const { data } = await client.get(`/auth/me`);
    return data;
  } catch (err) {
    throw new Error(extractError(err));
  }
};

export default { registerUser, loginUser, verifyUser, getProfile };
