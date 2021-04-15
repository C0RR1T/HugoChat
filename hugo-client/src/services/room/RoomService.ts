import RoomDTO from "./model/RoomDTO";

export default interface RoomService {
    create(name: string, isUnlisted: boolean): Promise<RoomDTO>;

    getAll(): Promise<RoomDTO[]>;
}