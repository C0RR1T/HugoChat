import UserService from "./UserService";
import UserDTO from "./model/UserDTO";

export default class UserServiceMock implements UserService {

    private users: string[];

    constructor() {
        this.users = ["hugo", "timo nicolas angst", "noel", "schiel", "gebhardt", "rolf", "Michi", "dragon99", "Cyrill", "Joey Rüegg", "Mark Zuckerberg"];
        setInterval(() => {
            this.users.push("cors");
        }, 1000);
    }

    async changeName(user: UserDTO): Promise<UserDTO> {
        return Promise.resolve({
            name: user.name,
            uuid: "8b343b07-83bd-47e0-b317-7dbb8e3985a8"
        });
    }

    async createUser(user: UserDTO): Promise<UserDTO> {
        await new Promise(r => setTimeout(r, 500));
        return Promise.resolve({
            name: user.name,
            uuid: "8b343b07-83bd-47e0-b317-7dbb8e3985a8"
        })
    }

    async getUsers(): Promise<string[]> {
        return Promise.resolve(this.users);
    }

    async keepActive(uuid: string): Promise<void> {
        return Promise.resolve();
    }
}