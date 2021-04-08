import MessageDTO from "./model/MessageDTO";

export default interface MessageService {
    getNewMessages(after: number): Promise<MessageDTO[]>;

    getAllMessages(): Promise<MessageDTO[]>;

    createMessage(msg: MessageDTO): Promise<MessageDTO>;
}