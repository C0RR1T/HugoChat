import UserService from "./UserService";
import UserDTO from "./model/UserDTO";
import axiosAPI from "../AxiosUtility";

export default class UserServiceImpl implements UserService {
    async createUser(name: string): Promise<UserDTO> {
        try {
            const {data} = await axiosAPI.post<UserDTO>("/users", {name})
            console.log("Registered user with id " + data.id);
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }

    async keepActive(roomId: string, uuid: string): Promise<void> {
        try {
            await axiosAPI.patch<UserDTO>(`rooms/${roomId}/users/active/${uuid}`)
        } catch (e) {
            throw new Error(e);
        }
    }

    async getUsers(roomId: string): Promise<UserDTO[]> {
        try {
            const {data} = await axiosAPI.get<UserDTO[]>(`/rooms/${roomId}/users`);
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }

    async changeName(user: UserDTO): Promise<UserDTO> {
        try {
            const {data} = await axiosAPI.put<UserDTO>("/users", user);
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }

    filterUserDTO(data: UserDTO[], selfId: string): UserDTO[] {
        return data.filter(user => user.id !== selfId);
    }
}