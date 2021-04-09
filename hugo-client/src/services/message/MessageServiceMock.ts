import MessageService from "./MessageService";
import MessageDTO from "./model/MessageDTO";
import {MessageProps} from "../../pages/chat/Messages";

export default class MessageServiceMock implements MessageService {

    private messages: MessageDTO[];
    private idCounter: number = 1;

    constructor() {
        this.messages = [
            {
                sentBy: "corsin",
                sentByID: "8b343b07-83bd-47e0-b317-7dbb8e3985a8",
                body: "hallo",
                sentOn: Date.now() - 10000,
                id: `${this.idCounter++}`
            },
            {
                sentBy: "hugo",
                sentByID: "8b34fb07-83bd-47e0-b317-7dbb8e3985a8",
                body: "hallo leut",
                sentOn: Date.now() - 90000,
                id: `${this.idCounter++}`
            },
            {
                sentBy: "Timo Nicolas Angst",
                sentByID: "8b34fb07-93bd-47e0-b317-7dbb8e3985a8",
                body: "ich bin timo",
                sentOn: Date.now() - 5000,
                id: `${this.idCounter++}`
            },
            {
                sentBy: "hugo",
                sentByID: "8b34fb07-93bd-47e0-b317-7dbb8e3985a8",
                body: "hallo" +
                    "mein name ist hugo boss" +
                    "lol wenn ich hier ganz viel schreibe sollte es wrappen, ----------------------------------------------------- lol wenn ich hier ganz viel schreibe sollte es wrappen, -----------------------------------------------------lol wenn ich hier ganz viel schreibe sollte es wrappen, -----------------------------------------------------lol wenn ich hier ganz viel schreibe sollte es wrappen, -----------------------------------------------------",
                sentOn: Date.now() - 1000,
                id: `${this.idCounter++}`
            }
        ];

        setInterval(() => {
            if (Math.random() > 0.9) {
                this.messages.push({sentBy: "fake corsin", body: "stop pls", sentByID: "8b343b07-83bd-47e0-b317-7dbb8e3985a8", sentOn: Date.now(), id: `${this.idCounter++}`});
            } else {
                this.messages.push({sentBy: "dragon99", body: "spam", sentByID: "", sentOn: Date.now(), id: `${this.idCounter++}`});
            }
        }, 500);
    }

    async createMessage(msg: MessageDTO): Promise<MessageDTO> {
        this.messages.push(msg);
        return Promise.resolve(msg);
    }

    async getOldMessages(before: string = "", amount: number = 100): Promise<MessageDTO[]> {
        return Promise.resolve([...this.messages]);
    }

    async getNewMessages(after: string): Promise<MessageDTO[]> {
        const filtered = this.messages.filter(msg => parseInt(msg.id) > parseInt(after));
        return Promise.resolve(filtered);
    }

    dtoToProps(dtos: MessageDTO[], ownId: string): MessageProps[] {
        return dtos.map(dto => {
            return {
                author: dto.sentBy,
                own: dto.sentByID === ownId,
                timestamp: dto.sentOn,
                content: dto.body
            };
        });
    }
}