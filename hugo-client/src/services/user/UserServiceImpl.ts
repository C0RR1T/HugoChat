import UserService from "./UserService";
import UserDTO from "./model/UserDTO";
import axiosAPI from "../AxiosUtility";

export default class UserServiceImpl implements UserService {
    async createUser(user: UserDTO): Promise<UserDTO> {
        try {
            const {data} = await axiosAPI.post<UserDTO>("/users", user)
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }

    async keepActive(uuid: string): Promise<void> {
        try {
            await axiosAPI.post<UserDTO>(`/users/active/${uuid}`)
        } catch (e) {
            throw new Error(e);
        }
    }
}