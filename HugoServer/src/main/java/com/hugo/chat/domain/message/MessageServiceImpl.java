package com.hugo.chat.domain.message;


import com.hugo.chat.domain.user.UserRepository;
import com.hugo.chat.model.message.Message;
import com.hugo.chat.model.message.dto.MessageDTO;
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
        messagedto.setId(null);
        Message message = MessageDTO.toMessage(messagedto);
        message.setSentOn(System.currentTimeMillis()); //the server sets the time so that everything is sync
        message.setId(null);
        if (userRepo.existsById(UUID.fromString(messagedto.getSentBy()))) {
            message.setUserID(UUID.fromString(messagedto.getSentByID()));
            return MessageDTO.toMessageDTO(repository.saveAndFlush(message));
        } else throw new NoSuchElementException();
    }

    @Override
    public Collection<MessageDTO> getOldMessages(String messageID, String amountString) throws IllegalArgumentException {
        int amount = Integer.parseInt(amountString);
        Optional<Message> m = repository.findById(UUID.fromString(messageID));
        if (m.isPresent()) {
            return getMessagesBefore(m.get().getSentOn(), amount);
        } else throw new NoSuchElementException();
    }

    @Override
    public Collection<MessageDTO> getOldMessages(String amountString) {
        int amount = Integer.parseInt(amountString);
        return getMessagesBefore(System.currentTimeMillis(), amount);
    }

    private Collection<MessageDTO> getMessagesBefore(long before, int amount) {
        return repository.getOldMessage(before).stream().limit(amount).map(MessageDTO::toMessageDTO).collect(Collectors.toList());
    }

    @Override
    public Collection<MessageDTO> getNewMessages(String messageID) {
        Optional<Message> m = repository.findById(UUID.fromString(messageID));
        if (m.isPresent()) {
            return repository.getNewMessage(Long.parseLong(messageID)).stream()
                    .map(MessageDTO::toMessageDTO).collect(Collectors.toList());
        } else throw new NoSuchElementException();
    }
}
