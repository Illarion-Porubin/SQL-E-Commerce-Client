import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import type { InternalAxiosRequestConfig } from "axios";

export const API_URL = "http://localhost:5000"

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

//If you need to run tests, then comment out the code below

// $api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
//     return config;
// })

// $api.interceptors.response.use((config) => {
//     return config;
// },async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && error.config && !error.config._isRetry) {
//         originalRequest._isRetry = true;
//         try {
//             const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
//             localStorage.setItem('token', response.data.accessToken);
//             return $api.request(originalRequest);
//         } catch (e) {
//             console.log('НЕ АВТОРИЗОВАН')
//         }
//     }
//     throw error;
// })

////////////////////////////////////////

export default $api;
 