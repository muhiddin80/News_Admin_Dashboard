import axios from "axios";

export const customAxios = axios.create({
  baseURL: "https://news-admin-dashboard-d0va.onrender.com/api",
  withCredentials: true,
});
