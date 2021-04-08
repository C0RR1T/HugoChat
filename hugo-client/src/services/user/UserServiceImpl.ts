import UserService from "./UserService";
import UserDTO from "./model/UserDTO";
import axios from "axios";

export default class UserServiceImpl implements UserService {
    async createUser(user: UserDTO): Promise<UserDTO> {
        try {
            const {data} = await axios.post<UserDTO>("/login", user)
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }
}