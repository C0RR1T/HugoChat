package com.hugo.chat.domain.message;


import com.hugo.chat.model.message.dto.MessageDTO;

import java.util.Collection;

public interface MessageService {
    MessageDTO createMessage(MessageDTO message);
    Collection<MessageDTO> getAllMessages();
    Collection<MessageDTO> getNewMessages(String timestampString);
}
