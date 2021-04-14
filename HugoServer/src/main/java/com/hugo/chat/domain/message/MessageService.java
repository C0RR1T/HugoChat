package com.hugo.chat.domain.message;


import com.hugo.chat.model.message.dto.MessageDTO;

import java.util.Collection;

public interface MessageService {
    MessageDTO createMessage(MessageDTO message, String roomId);
    Collection<MessageDTO> getOldMessages(String messageId, int amount, String roomId);
    Collection<MessageDTO> getOldMessages(int amount, String roomId);
}
