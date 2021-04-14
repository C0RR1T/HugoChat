import UserService from "../user/UserService";
import UserDTO from "../user/model/UserDTO";
import mockServer from "./MockServer";
import {v4} from "uuid";

export default class UserServiceMock implements UserService {

    async changeName(user: UserDTO): Promise<UserDTO> {
        return Promise.resolve(user);
    }

    async createUser(name: string): Promise<UserDTO> {
        await new Promise(r => setTimeout(r, 500));
        return Promise.resolve({
            name,
            id: v4()
        })
    }

    async getUsers(roomId: string): Promise<UserDTO[]> {
        return Promise.resolve(mockServer.rooms[roomId].users);
    }

    async keepActive(roomId: string, uuid: string): Promise<void> {
        return Promise.resolve();
    }

    filterUserDTO(data: UserDTO[], selfId: string): UserDTO[] {
        return data.filter(user => user.id !== selfId);
    }
}