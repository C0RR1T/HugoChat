import RoomService from "./RoomService";
import RoomDTO from "./model/RoomDTO";
import axiosAPI from "../AxiosUtility";

export default class RoomServiceImpl implements RoomService {
    async create(name: string, isUnlisted: true): Promise<RoomDTO> {
        try {
            const {data} = await axiosAPI.post<RoomDTO>(`/rooms?listed=${!isUnlisted}`, {name})
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