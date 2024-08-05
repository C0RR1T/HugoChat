import axios, {AxiosInstance} from "axios";

const BASE_URL = "https://api.hugo-chat.noratrieb.dev/api/v2";
//const BASE_URL = "http://localhost:8080";

const defaultAxiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

export {BASE_URL};
export default defaultAxiosInstance;
