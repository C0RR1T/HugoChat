package com.hugo.chat.domain.message;


import com.hugo.chat.model.message.dto.MessageDTO;

import java.util.Collection;

public interface MessageService {
    MessageDTO createMessage(MessageDTO message, String roomId);

    Collection<MessageDTO> getLatestMessages(String messageId, int amount, String roomId);

    Collection<MessageDTO> getLatestMessages(int amount, String roomId);
}
