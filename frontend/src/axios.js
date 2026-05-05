import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true, // important if using cookies/auth
});

export default api;