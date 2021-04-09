import MessageDTO from "./model/MessageDTO";
import {MessageProps} from "../../pages/chat/Messages";
import MessageDTOSend from "./model/MessageDTOSend";

export default interface MessageService {
    getNewMessages(after: string): Promise<MessageDTO[]>;

    getOldMessages(before: string, amount: number): Promise<MessageDTO[]>;

    getLatestMessages(amount: number): Promise<MessageDTO[]>;

    createMessage(msg: MessageDTOSend): Promise<MessageDTO>;

    dtoToProps(dtos: MessageDTO[], ownId: string): MessageProps[];

}