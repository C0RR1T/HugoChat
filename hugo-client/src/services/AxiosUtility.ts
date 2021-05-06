import axios, {AxiosInstance} from "axios";

const BASE_URL = "http://161.97.165.1:8080/api/v2";
//const BASE_URL = "http://localhost:8080";

const defaultAxiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

export {BASE_URL};
export default defaultAxiosInstance;