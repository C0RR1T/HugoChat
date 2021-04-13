import axios, {AxiosInstance} from "axios";

const defaultAxiosInstance: AxiosInstance = axios.create({
    //baseURL: "http://87.245.85.125:8080/api/v1",
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json"
    }
});

export default defaultAxiosInstance;