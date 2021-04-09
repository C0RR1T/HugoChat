import MessageService from "./MessageService";
import MessageDTO from "./model/MessageDTO";
import axiosAPI from "../AxiosUtility";
import {MessageProps} from "../../pages/chat/Messages";

export default class MessageServiceImpl implements MessageService {
    async getOldMessages(before: string = "", amount: number = 100): Promise<MessageDTO[]> {
        try {
            const {data} = await axiosAPI.get<MessageDTO[]>(`/messages/old/${before}?amount=${amount}`);
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }

    async getLatestMessages(amount: number): Promise<MessageDTO[]> {
        try {
            const {data} = await axiosAPI.get<MessageDTO[]>(`/messages/old?amount=${amount}`);
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }

    async getNewMessages(after: string): Promise<MessageDTO[]> {
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

    dtoToProps(dtos: MessageDTO[], ownId: string): MessageProps[] {
        return dtos.map(dto => {
            return {
                author: dto.sentBy,
                own: dto.sentByID === ownId,
                timestamp: dto.sentOn,
                content: dto.body
            }
        });
    }

}