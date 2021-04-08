package com.hugo.chat.domain.message;


import com.hugo.chat.model.message.dto.MessageDTO;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class MessageServiceImpl implements MessageService {
    private MessageRepository repository;

    public MessageServiceImpl(MessageRepository repository) {
        this.repository = repository;
    }

    @Override
    public MessageDTO createMessage(MessageDTO message) {
        return MessageDTO.toMessageDTO(repository.saveAndFlush(MessageDTO.toMessage(message)));
    }

    @Override
    public Collection<MessageDTO> getAllMessages() {
        return repository.findAll().stream().map(MessageDTO::toMessageDTO).collect(Collectors.toList());
    }

    @Override
    public Collection<MessageDTO> getNewMessages(String timestampString) {
        return repository.getNewMessage(Long.parseLong(timestampString)).stream()
                .map(MessageDTO::toMessageDTO).collect(Collectors.toList());
    }
}
