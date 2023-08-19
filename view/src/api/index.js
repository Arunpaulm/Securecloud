import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:2021/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'Securecloud' }
});

export default axiosInstance