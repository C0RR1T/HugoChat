import axios, {AxiosInstance} from "axios";

const defaultAxiosInstance: AxiosInstance = axios.create({
    baseURL: "http://192.168.178.29:8080/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
});

export default defaultAxiosInstance;