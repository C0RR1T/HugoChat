import MessageDTO from "./model/MessageDTO";
import {MessageProps} from "../../pages/chat/Messages";

export default interface MessageService {
    getNewMessages(after: string): Promise<MessageDTO[]>;

    getOldMessages(before: string, amount: number): Promise<MessageDTO[]>;

    getLatestMessages(amount: number): Promise<MessageDTO[]>;

    createMessage(msg: MessageDTO): Promise<MessageDTO>;

    dtoToProps(dtos: MessageDTO[], ownId: string): MessageProps[];

}