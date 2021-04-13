import MessageDTO from "./model/MessageDTO";
import {MessageProps} from "../../pages/chat/Messages";

export default interface MessageService {
    getLatestMessages(roomId: string, amount: number): Promise<MessageDTO[]>;

    getMessagesBefore(roomId: string, beforeMessage: string, amount: number): Promise<MessageDTO[]>;

    getMessagesAfter(roomId: string, afterMessage: string): Promise<MessageDTO[]>;

    createMessage(msg: MessageDTO): Promise<MessageDTO>;

    dtoToProps(dtos: MessageDTO[], ownId: string): MessageProps[];
}