import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:2021/',
    timeout: 1000,
    headers: {
        'X-Custom-Header': 'Securecloud',
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    }
});

export default axiosInstance