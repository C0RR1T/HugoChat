import UserDTO from "./model/UserDTO";

export default interface UserService {

    createUser(name: string): Promise<UserDTO>;

    keepActive(roomId: string, uuid: string): Promise<void>;

    getUsers(roomId: string): Promise<UserDTO[]>;

    changeName(user: UserDTO): Promise<UserDTO>;

    filterUserDTO(data: UserDTO[], selfId: string): UserDTO[]
}