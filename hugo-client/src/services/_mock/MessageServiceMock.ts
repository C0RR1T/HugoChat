import MessageService from "../message/MessageService";
import MessageDTO from "../message/model/MessageDTO";
import {MessageProps} from "../../pages/chat/Messages";
import {v4 as uuid} from 'uuid';
import mockServer, {MockServer} from "./MockServer";

export default class MessageServiceMock implements MessageService {

    private server: MockServer;

    constructor() {
        this.server = mockServer;
    }

    async createMessage(roomId: string, msg: MessageDTO): Promise<MessageDTO> {
        const message = {
            sentBy: msg.sentBy,
            sentOn: Date.now(),
            body: msg.body,
            sentByID: msg.sentByID,
            id: uuid(),
        };
        this.server.addMessage(message, roomId);
        return Promise.resolve(message);
    }

    dtoToProps(dtos: MessageDTO[], ownId: string): MessageProps[] {
        return dtos.map(dto => {
            return {
                author: dto.sentBy,
                own: dto.sentByID === ownId,
                timestamp: dto.sentOn,
                content: dto.body,
                id: dto.id
            }
        });
    }

    getLatestMessages(roomId: string, amount: number): Promise<MessageDTO[]> {
        const messages = [...this.server.rooms[roomId].messages]
            .reverse()
            .filter((_, i) => i < amount)
            .reverse();
        return Promise.resolve(messages);
    }

    getMessagesAfter(roomId: string, afterMessage: string): Promise<MessageDTO[]> {
        const after = this.server.rooms[roomId].messages.find(msg => msg.id = afterMessage) || {sentOn: 0};

        const messages = this.server.rooms[roomId].messages
            .filter(msg => msg.sentOn > after.sentOn);

        return Promise.resolve(messages);
    }

    getMessagesBefore(roomId: string, beforeMessage: string, amount: number): Promise<MessageDTO[]> {
        const before = this.server.rooms[roomId].messages.find(msg => msg.id = beforeMessage) || {sentOn: 0};

        const messages = this.server.rooms[roomId].messages
            .filter(msg => msg.sentOn < before.sentOn)
            .reverse()
            .filter((_, i) => i < amount)
            .reverse();

        return Promise.resolve(messages);
    }
}