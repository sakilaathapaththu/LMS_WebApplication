import axios from "axios";

// export const API_BASE_URL = "http://localhost:10000/api";
// export const IMAGE_BASE_URL = "http://localhost:10000"; // for profile/course images

export const API_BASE_URL = "https://lms-web-application-five.vercel.app/api";
export const IMAGE_BASE_URL = "https://lms-web-application-five.vercel.app";
const API = axios.create({
  baseURL: API_BASE_URL,
});

// ✅ Attach token to every request if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default API;
