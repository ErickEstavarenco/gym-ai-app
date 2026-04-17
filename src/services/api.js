import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const generateWorkout = async (api, data) => {
  const res = await api.post("/api/ai/generate-workout", data);
  return res.data;
};

// 🔐 Interceptor → adiciona token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;