import MessageService from "./MessageService";
import MessageDTO from "./model/MessageDTO";
import axios from "axios";

export default class MessageServiceImpl implements MessageService {
    async getAllMessages(): Promise<MessageDTO[]> {
        try {
            const {data} = await axios.get<MessageDTO[]>("/messages");
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }

    async getNewMessages(after: number): Promise<MessageDTO[]> {
        try {
            const {data} = await axios.get<MessageDTO[]>(`/messages/new/${after}`)
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }

    async createMessage(msg: MessageDTO): Promise<MessageDTO> {
        try {
            const {data} = await axios.post<MessageDTO>("/messages", msg)
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }
}