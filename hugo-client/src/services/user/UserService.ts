import UserDTO from "./model/UserDTO";

export default interface UserService {
    createUser(user: UserDTO): Promise<UserDTO>;

    keepActive(roomId: string, uuid: string): Promise<void>;

    getUsers(roomId: string): Promise<UserDTO[]>;

    changeName(user: UserDTO): Promise<UserDTO>;

    userDTOtoString(data: UserDTO[], selfId: string): string[]
}