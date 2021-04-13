import RoomDTO from "./model/RoomDTO";

export default interface RoomService {
    create(name: string): Promise<RoomDTO>;

    getAll(): Promise<RoomDTO[]>;
}