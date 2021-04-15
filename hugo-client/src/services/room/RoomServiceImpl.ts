import RoomService from "./RoomService";
import RoomDTO from "./model/RoomDTO";
import axiosAPI from "../AxiosUtility";
import UserDTO from "../user/model/UserDTO";

export default class RoomServiceImpl implements RoomService {
    async create(name: string): Promise<RoomDTO> {
        try {
            const {data} = await axiosAPI.post<RoomDTO>("/rooms", {name})
            console.log("Created room with id " + data.id);
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }

    async getAll(): Promise<RoomDTO[]> {
        try {
            const {data} = await axiosAPI.get<RoomDTO[]>("/rooms")
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }

}