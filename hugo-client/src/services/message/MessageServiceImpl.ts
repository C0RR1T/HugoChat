import MessageService from "./MessageService";
import MessageDTO from "./model/MessageDTO";
import axiosAPI from "../AxiosUtility";
import {MessageProps} from "../../pages/chat/Messages";

export default class MessageServiceImpl implements MessageService {
    async getLatestMessages(roomId: string, amount: number): Promise<MessageDTO[]> {
        try {
            const {data} = await axiosAPI.get<MessageDTO[]>(`/rooms/${roomId}/messages/latest?amount=${amount}`);
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }

    async getMessagesBefore(roomId: string, beforeMessage: string, amount: number): Promise<MessageDTO[]> {
        try {
            const {data} = await axiosAPI.get<MessageDTO[]>(`/rooms/${roomId}/messages/before/${beforeMessage}?amount=${amount}`);
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }

    async getMessagesAfter(roomId: string, afterMessage: string): Promise<MessageDTO[]> {
        try {
            const {data} = await axiosAPI.get<MessageDTO[]>(`/rooms/${roomId}/messages/after/${afterMessage}`)
            return data;
        } catch (e) {
            throw new Error(e);
        }
    }

    async createMessage(roomId: string, msg: MessageDTO): Promise<MessageDTO> {
        try {
            const {data} = await axiosAPI.post<MessageDTO>(`/rooms/${roomId}/messages`, msg);
            return data;
        } catch (e) {
            throw new Error(e.response.data);
        }
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
}