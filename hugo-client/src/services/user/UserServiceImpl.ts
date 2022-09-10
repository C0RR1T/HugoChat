import UserService from "./UserService";
import UserDTO from "./model/UserDTO";
import axiosAPI from "../AxiosUtility";

export default class UserServiceImpl implements UserService {
    async createUser(name: string): Promise<UserDTO> {
        const {data} = await axiosAPI.post<UserDTO>("/users", {name})
        console.log("Registered user with id " + data.id);
        return data;
    }

    async keepActive(roomId: string, uuid: string): Promise<void> {
        await axiosAPI.patch<UserDTO>(`rooms/${roomId}/users/active/${uuid}`);
    }

    async getUsers(roomId: string): Promise<UserDTO[]> {
        const {data} = await axiosAPI.get<UserDTO[]>(`/rooms/${roomId}/users`);
        return data;
    }

    async changeName(user: UserDTO): Promise<UserDTO> {
        const {data} = await axiosAPI.put<UserDTO>("/users", user);
        return data;
    }

    filterUserDTO(data: UserDTO[], selfId: string): UserDTO[] {
        return data.filter(user => user.id !== selfId);
    }
}