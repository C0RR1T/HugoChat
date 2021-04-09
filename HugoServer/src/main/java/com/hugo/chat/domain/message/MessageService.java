package com.hugo.chat.domain.message;


import com.hugo.chat.model.message.dto.MessageDTO;

import java.util.Collection;

public interface MessageService {
    MessageDTO createMessage(MessageDTO message);
    Collection<MessageDTO> getOldMessages(String timestampString, String amountString);
    Collection<MessageDTO> getNewMessages(String timestampString);
}
