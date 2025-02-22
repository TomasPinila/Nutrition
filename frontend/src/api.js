// Axios interceptor to automatically add correct headers with axios, clean way to send ntw requests.
// When request is sent we check if access token exists to automatically add to request
import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Specify anything from environment variable
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN); // try to get access token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // insert token to headers if exists
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
