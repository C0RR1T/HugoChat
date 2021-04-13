import MessageDTO from "../message/model/MessageDTO";
import rooms from "./_mock_resources/rooms.json"


interface Room {
    id: string,
    name: string,
    messages: MessageDTO[]
}


class MockServer {
    rooms: Record<string, Room>;

    constructor() {
        this.rooms = rooms;
    }
}

const mockServer = new MockServer();
export default mockServer;
export type {MockServer};