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
     * Creates new Message
     * @param messagedto DTO to be created
     * @param roomId In which room the message should be saved in
     * @return The saved Message as DTO
     * @throws NoSuchElementException When the RoomID doesn't exists
     * @throws NoSuchElementException When the UserID doesn't exists
     * @throws IllegalArgumentException When the message body is to long (-> MAX_MESSAGE_LENGTH)
     * @throws IllegalArgumentException When the User sends messages too fast
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
     * Gets messages before a specific message
     * @param messageID ID of message to check before
     * @param amount Amount of messages sent
     * @param roomId Room of the messages
     * @return Collection of MessageDTOs
     * @throws IllegalArgumentException When the MessageID isn't found
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
     * Gets all Messages before a timestamp, returns an Array with the length of amount
     * @param before UNIX timestamp
     * @param amount How many messages should be sent
     * @param roomId Messages from room
     * @return Collection of MessageDTOs
     */
    private Collection<MessageDTO> getMessagesBefore(long before, int amount, String roomId) {
        return repository.getOldMessage(before, UUID.fromString(roomId)).stream()
                .limit(amount)
                .sorted(Comparator.comparingLong(Message::getSentOn))
                .map(MessageDTO::toMessageDTO)
                .collect(Collectors.toList());
    }
}
