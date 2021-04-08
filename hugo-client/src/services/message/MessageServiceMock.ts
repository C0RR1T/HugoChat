import MessageService from "./MessageService";
import MessageDTO from "./model/MessageDTO";
import {MessageProps} from "../../pages/chat/Messages";

export default class MessageServiceMock implements MessageService {

    private messages: MessageDTO[];

    constructor() {
        this.messages = [
            {
                sentBy: "corsin",
                sentByID: "8b343b07-83bd-47e0-b317-7dbb8e3985a8",
                body: "hallo",
                sentOn: 1617887629000
            },
            {
                sentBy: "hugo",
                sentByID: "8b34fb07-83bd-47e0-b317-7dbb8e3985a8",
                body: "hallo leut",
                sentOn: 1617887549000
            },
            {
                sentBy: "Timo Nicolas Angst",
                sentByID: "8b34fb07-93bd-47e0-b317-7dbb8e3985a8",
                body: "ich bin timo",
                sentOn: 1617886650000
            },
            {
                sentBy: "hugo",
                sentByID: "8b34fb07-93bd-47e0-b317-7dbb8e3985a8",
                body: "hallo" +
                    "mein name ist hugo boss" +
                    "lol wenn ich hier ganz viel schreibe sollte es wrappen, -----------------------------------------------------",
                sentOn: 1617888650000
            }
        ];

        setInterval(() => {
            this.messages.push({sentBy: "dragon99", body: "spam", sentByID: "", sentOn: 1617887549000});
        }, 500);
    }

    async createMessage(msg: MessageDTO): Promise<MessageDTO> {
        return Promise.resolve(msg);
    }

    async getAllMessages(): Promise<MessageDTO[]> {
        return Promise.resolve(this.messages);
    }

    async getNewMessages(after: number): Promise<MessageDTO[]> {
        return Promise.resolve([]);
    }

    dtoToProps(dtos: MessageDTO[], ownId: string): MessageProps[] {
        return dtos.map(dto => {
            return {
                author: dto.sentBy,
                own: dto.sentByID === ownId,
                content: dto.body
            }
        });
    }
}