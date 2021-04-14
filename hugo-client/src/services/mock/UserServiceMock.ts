import UserService from "../user/UserService";
import UserDTO from "../user/model/UserDTO";
import mockServer from "./MockServer";

export default class UserServiceMock implements UserService {

    async changeName(user: UserDTO): Promise<UserDTO> {
        return Promise.resolve({
            name: user.name,
            id: "8b343b07-83bd-47e0-b317-7dbb8e3985a8"
        });
    }

    async createUser(user: UserDTO): Promise<UserDTO> {
        await new Promise(r => setTimeout(r, 500));
        return Promise.resolve({
            name: user.name,
            id: "8b343b07-83bd-47e0-b317-7dbb8e3985a8"
        })
    }

    async getUsers(roomId: string): Promise<UserDTO[]> {
        return Promise.resolve(mockServer.rooms[roomId].users);
    }

    async keepActive(roomId: string, uuid: string): Promise<void> {
        return Promise.resolve();
    }

    userDTOtoString(data: UserDTO[], selfId: string): string[] {
        return data.filter(user => user.id !== selfId).map(user => user.name)
    }
}