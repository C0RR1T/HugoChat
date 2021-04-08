import UserService from "./UserService";
import UserDTO from "./model/UserDTO";
import axios from "axios";

export default class UserServiceImpl implements UserService {
    async createUser(user: UserDTO): Promise<UserDTO> {
        try {
            const {data} = await axios.post<UserDTO>("/users", user)
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }

    async keepActive(uuid: string): Promise<void> {
        try {
            await axios.post<UserDTO>(`/users/active/${uuid}`)
        } catch (e) {
            throw new Error(e);
        }
    }
}