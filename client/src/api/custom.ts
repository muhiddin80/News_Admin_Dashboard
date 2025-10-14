import axios from "axios";

export const customAxios = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});
