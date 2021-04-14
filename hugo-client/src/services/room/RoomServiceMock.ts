import RoomService from "./RoomService";
import RoomDTO from "./model/RoomDTO";
import mockServer from "../_mock/MockServer";
import {v4} from "uuid";

export default class RoomServiceMock implements RoomService {
    create(name: string): Promise<RoomDTO> {
        const id = v4();
        return Promise.resolve(mockServer.rooms[id] = {
            name,
            id,
            messages: [],
            users: []
        });
    }

    getAll(): Promise<RoomDTO[]> {
        return Promise.resolve(Object.keys(mockServer.rooms).map(k => mockServer.rooms[k]));
    }
}