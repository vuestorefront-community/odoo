import axios from 'axios';
const axiosInstance = axios.create();
axiosInstance.defaults.withCredentials = true;

export const client = axiosInstance;
