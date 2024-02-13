import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const $api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  baseURL: API_URL,
});
