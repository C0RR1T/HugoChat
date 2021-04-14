import MessageDTO from "../message/model/MessageDTO";
import rooms from "./_mock_resources/rooms.json"
import UserDTO from "../user/model/UserDTO";


interface Room {
    id: string,
    name: string,
    messages: MessageDTO[],
    users: UserDTO[]
}


class MockServer {
    rooms: { [k: string]: Room };

    constructor() {
        this.rooms = rooms;
    }
}

const mockServer = new MockServer();
export default mockServer;
export type {MockServer};