import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

(async () => {
    const userId = await AsyncStorage.getItem("user_id");
    axiosInstance.defaults.headers.common['x-api-key'] = userId
})()

export default axiosInstance