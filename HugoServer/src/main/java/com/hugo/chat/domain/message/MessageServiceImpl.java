package com.hugo.chat.domain.message;


import com.hugo.chat.model.message.Message;
import com.hugo.chat.model.message.dto.MessageDTO;
import org.springframework.stereotype.Service;

import java.time.ZoneOffset;
import java.util.Collection;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;
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
    public Collection<MessageDTO> getNewMessages(String messageID) {
        Optional<Message> m = repository.findById(UUID.fromString(messageID));
        if (m.isPresent()) {
//            return repository.getNewMessage(m.get().getSentOn().toInstant(ZoneOffset.UTC).toEpochMilli()).stream()
//                    .map(MessageDTO::toMessageDTO).collect(Collectors.toList());
            return null;
        } else throw new NoSuchElementException("Message ID was not found");
    }
}
