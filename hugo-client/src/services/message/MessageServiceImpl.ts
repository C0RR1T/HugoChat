import MessageService from "./MessageService";
import MessageDTO from "./model/MessageDTO";
import axiosAPI from "../AxiosUtility";

export default class MessageServiceImpl implements MessageService {
    async getAllMessages(): Promise<MessageDTO[]> {
        try {
            const {data} = await axiosAPI.get<MessageDTO[]>("/messages");
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }

    async getNewMessages(after: number): Promise<MessageDTO[]> {
        try {
            const {data} = await axiosAPI.get<MessageDTO[]>(`/messages/new/${after}`)
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }

    async createMessage(msg: MessageDTO): Promise<MessageDTO> {
        try {
            const {data} = await axiosAPI.post<MessageDTO>("/messages", msg)
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }
}