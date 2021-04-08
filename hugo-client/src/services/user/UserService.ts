import UserDTO from "./model/UserDTO";

export default interface UserService {
    createUser(user: UserDTO): Promise<UserDTO>;

    keepActive(uuid: string): Promise<void>;

    getUsers(selfId: string): Promise<UserDTO[]>;

    userDTOtoString(data: UserDTO[], selfId: string): string[]

    changeName(user: UserDTO): Promise<UserDTO>;
}