// src/utils/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER}/api/v1`,
});

export default api;
