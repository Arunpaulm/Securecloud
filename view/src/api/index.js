import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

let axiosInstance = ""

// 1. Creating the `Counter` class, which contains a `constructor`, `getInstance`, `getCount`, `increment` and `decrement` method.
// Within the constructor, we check to make sure the class hasn't already been instantiated.
class Axios {
    constructor () {
        if (axiosInstance) {
            throw new Error("axios instance already initiated");
        } else {
            this.getInstance()
        }
    }

    getInstance() {
        axiosInstance = axios.create({
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
    }
}

Object.freeze(new Axios());

export default axiosInstance

























