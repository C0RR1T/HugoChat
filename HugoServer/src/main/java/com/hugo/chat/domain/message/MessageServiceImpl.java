package com.hugo.chat.domain.message;

import com.hugo.chat.domain.user.UserRepository;
import com.hugo.chat.model.message.dto.MessageDTO;
import com.hugo.chat.model.user.User;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MessageServiceImpl implements MessageService {
    private MessageRepository repository;
    private UserRepository userRepository;

    public MessageServiceImpl(MessageRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
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
    public Collection<MessageDTO> getNewMessages(String id) {
        Optional<User> u = userRepository.findById(UUID.fromString(id));
        if(u.isPresent()) {
            User user = u.get();
            return repository.findAll().stream().
                    filter(m essage -> !message.getSentBy().getId().equals(UUID.fromString(id)) &&
                            message.getSentOn().compareTo(LocalDateTime.ofInstant(Instant.ofEpochMilli(user.getLastChecked()), ZoneId.of("UTC"))) > 0)
                    .map(MessageDTO::toMessageDTO).collect(Collectors.toList());
        } else throw new NoSuchElementException();
    }
}
