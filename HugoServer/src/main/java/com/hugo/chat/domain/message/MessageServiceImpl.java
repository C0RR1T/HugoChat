package com.hugo.chat.domain.message;


import com.hugo.chat.domain.event.EventHandler;
import com.hugo.chat.domain.room.RoomRepository;
import com.hugo.chat.domain.user.UserRepository;
import com.hugo.chat.model.emitter.dto.EmitterDTO;
import com.hugo.chat.model.message.Message;
import com.hugo.chat.model.message.dto.MessageDTO;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MessageServiceImpl implements MessageService {
    private final MessageRepository repository;
    private final UserRepository userRepo;
    private final RoomRepository roomRepo;
    private final EventHandler eventHandler;

    private static final long MAX_MESSAGE_LENGTH = 1000;
    private static final long MESSAGE_PER_SECONDS = 10;

    public MessageServiceImpl(MessageRepository repository, UserRepository userRepo, RoomRepository roomRepo, EventHandler eventHandler) {
        this.repository = repository;
        this.userRepo = userRepo;
        this.roomRepo = roomRepo;
        this.eventHandler = eventHandler;
    }

    /**
     * Create a new message
     * throws an IllegalArgumentException if the user is ratelimited
     * a user is ratelimited when they have sent more than 10 messages in the last 10 seconds.
     */
    @Override
    public MessageDTO createMessage(MessageDTO messagedto, String roomId) {
        if (messagedto.getBody().length() > MAX_MESSAGE_LENGTH)
            throw new IllegalArgumentException("Message can't be longer than 1000 characters");

        Message message = MessageDTO.toMessage(messagedto);
        message.setSentOn(System.currentTimeMillis()); // The server sets the time so that everything is sync
        message.setId(null);

        if (!userRepo.existsById(UUID.fromString(messagedto.getSentByID())))
            throw new NoSuchElementException("UserID not found.");
        if (message.getBody().isBlank())
            throw new IllegalArgumentException("Message Body can't be blank.");
        if (repository.getNewestMessageFromUser(message.getUserID(), System.currentTimeMillis() - MESSAGE_PER_SECONDS * 1000) > MESSAGE_PER_SECONDS)
            throw new IllegalArgumentException("You're sending messages to fast.");
        if (!roomRepo.existsById(UUID.fromString(roomId)))
            throw new NoSuchElementException("Room ID not found.");

        message.setUserID(UUID.fromString(messagedto.getSentByID()));
        message.setRoomId(UUID.fromString(roomId));
        MessageDTO messageSaved = MessageDTO.toMessageDTO(repository.saveAndFlush(message));
        eventHandler.newEvent(new EmitterDTO<>("message", messageSaved), message.getRoomId());
        return messageSaved;
    }

    /**
     * Get an amount of messages sent before the message with the id messageID
     */
    @Override
    public Collection<MessageDTO> getLatestMessages(String messageID, int amount, String roomId) throws IllegalArgumentException {
        Optional<Message> m = repository.findById(UUID.fromString(messageID));
        if (m.isEmpty())
            throw new NoSuchElementException();
        return getMessagesBefore(m.get().getSentOn(), amount, roomId);
    }

    /**
     * Get the latest few messages in a channel
     */
    @Override
    public Collection<MessageDTO> getLatestMessages(int amount, String roomId) {
        return getMessagesBefore(System.currentTimeMillis(), amount, roomId);
    }


    /**
     * Get an amount of messages sent before the timestamp before
     */
    private Collection<MessageDTO> getMessagesBefore(long before, int amount, String roomId) {
        return repository.getOldMessage(before, UUID.fromString(roomId)).stream()
                .limit(amount)
                .sorted(Comparator.comparingLong(Message::getSentOn))
                .map(MessageDTO::toMessageDTO)
                .collect(Collectors.toList());
    }
}
