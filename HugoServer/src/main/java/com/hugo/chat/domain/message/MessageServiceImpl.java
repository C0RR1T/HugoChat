package com.hugo.chat.domain.message;


import com.hugo.chat.domain.user.UserRepository;
import com.hugo.chat.model.message.Message;
import com.hugo.chat.model.message.dto.MessageDTO;
import com.hugo.chat.model.user.User;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MessageServiceImpl implements MessageService {
    private final MessageRepository repository;
    private final UserRepository userRepo;

    public MessageServiceImpl(MessageRepository repository, UserRepository repository1) {
        this.repository = repository;
        this.userRepo = repository1;
    }

    @Override
    public MessageDTO createMessage(MessageDTO messagedto) {
        Message message = MessageDTO.toMessage(messagedto);
        Optional<User> user = userRepo.findById(UUID.fromString(messagedto.getSentByID()));
        if(user.isPresent()) {
            message.setSentBy(user.get());
            return MessageDTO.toMessageDTO(repository.saveAndFlush(message));
        } else throw new NoSuchElementException();
    }

    @Override
    public Collection<MessageDTO> getOldMessages(String timestampString, String amountString) throws IllegalArgumentException {
        long timestamp = Long.parseLong(timestampString);
        int amount = Integer.parseInt(amountString);
        return repository.getOldMessage(timestamp).stream().limit(amount).map(MessageDTO::toMessageDTO).collect(Collectors.toList());
    }

    @Override
    public Collection<MessageDTO> getNewMessages(String timestampString) {
        return repository.getNewMessage(Long.parseLong(timestampString)).stream()
                .map(MessageDTO::toMessageDTO).collect(Collectors.toList());
    }
}
