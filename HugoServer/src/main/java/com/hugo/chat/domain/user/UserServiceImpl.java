package com.hugo.chat.domain.user;

import com.hugo.chat.domain.event.EventHandlerImpl;
import com.hugo.chat.domain.room.RoomRepository;
import com.hugo.chat.model.emitter.dto.EmitterDTO;
import com.hugo.chat.model.room.Room;
import com.hugo.chat.model.user.User;
import com.hugo.chat.model.user.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository repository;
    private final RoomRepository roomRepo;
    private final EventHandlerImpl eventHandler;
    private static final long USER_TIMEOUT = 10_000;
    private static final long MAX_USERNAME_LENGTH = 255;


    public UserServiceImpl(UserRepository repository, RoomRepository roomRepo, EventHandlerImpl eventHandler) {
        this.repository = repository;
        this.roomRepo = roomRepo;
        this.eventHandler = eventHandler;
        deleteInactiveUser();
    }


    /**
     * Creates a new User
     *
     * @param user UserDTO containing the username
     * @return the new User as UserDTO
     * @throws IllegalArgumentException when the Username is too long (-> MAX_USERNAME_LENGTH
     */
    @Override
    public UserDTO createUser(UserDTO user) {
        if (user.getName().length() <= MAX_USERNAME_LENGTH) {
            user.setId(null);
            User u = UserDTO.toUser(user);
            u.setCurrentRoom(Room.MAIN_ROOM_ID);
            u.setLastActive(System.currentTimeMillis());
            u = repository.saveAndFlush(u);
            eventHandler.newEvent(new EmitterDTO<>("users", getUsers(u.getCurrentRoom())), u.getCurrentRoom());
            return new UserDTO(u.getId(), u.getName());
        } else throw new IllegalArgumentException("Username is too long");
    }

    /**
     * Gets all Users in a specific room
     *
     * @param roomId RoomID to be checked
     * @return the List of users in the room
     */
    @Override
    public Collection<UserDTO> getUsers(UUID roomId) {
        return repository.getUsersByRoom(roomId).stream().
                sorted((o1, o2) -> -Long.compare(o1.getLastActive(), o2.getLastActive()))
                .map(user -> new UserDTO(user.getId(), user.getName())).collect(Collectors.toList());
    }

    /**
     * Delete all users that have not sent their active signal for longer than 10s and send an SSE to the affected room
     */
    @Override
    public void deleteInactiveUser() {
        Timer timer = new Timer();
        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                HashMap<UUID, Long> roomCounts = new HashMap<>();
                roomRepo.findAll().forEach(room -> roomCounts.put(room.getId(), repository.getUserCountInRoom(room.getId())));
                repository.deleteInactiveUsers(System.currentTimeMillis() - USER_TIMEOUT);
                roomRepo.findAll().forEach(room -> {
                    if (roomCounts.get(room.getId()) > repository.getUserCountInRoom(room.getId()))
                        eventHandler.newEvent(new EmitterDTO<>("users", getUsers(room.getId())), room.getId());
                });
            }
        }, 10000, 10000);
    }

    /**
     * Updates the Username of a User
     *
     * @param user UserDTO containing new username and the ID of the user
     * @return the User as DTO with the new username
     * @throws IllegalArgumentException when the username is longer than MAX_USERNAME_LENGTH
     * @throws NoSuchElementException   when the UserID doesn't exists
     */
    @Override
    public UserDTO updateUser(UserDTO user) {
        if (user.getName().length() <= MAX_USERNAME_LENGTH) {
            Optional<User> opt = repository.findById(user.getId());
            if (opt.isPresent()) {
                User u = opt.get();
                u.setName(user.getName());
                repository.saveAndFlush(u);
                eventHandler.newEvent(new EmitterDTO<>("users", getUsers(u.getCurrentRoom())), u.getCurrentRoom());
                return new UserDTO(u.getId(), u.getName());
            } else throw new NoSuchElementException();
        } else throw new IllegalArgumentException();
    }

    /**
     * Sets the User active again, if the roomId doesn't match up with the saved room of the User, a event is triggered in both room to update their Userlist
     *
     * @param id     ID of the User
     * @param roomId ID of the room
     * @throws NoSuchElementException when the UserID doesn't exist
     * @throws NoSuchElementException when the RoomID doesn't exist
     */
    @Override
    public void setUserActive(String id, String roomId) {
        Optional<User> optUser = repository.findById(UUID.fromString(id));
        if (optUser.isEmpty())
            throw new NoSuchElementException("UserID doesn't exist.");
        if(!roomRepo.existsById(UUID.fromString(roomId)))
            throw new NoSuchElementException("RoomID doesn't exist");
        User user = optUser.get();
        user.setLastActive(System.currentTimeMillis());
        if (user.getCurrentRoom() != UUID.fromString(roomId)) {
            UUID oldId = user.getCurrentRoom();
            user.setCurrentRoom(UUID.fromString(roomId));
            eventHandler.newEvent(new EmitterDTO<>("users", getUsers(oldId)), oldId);
            eventHandler.newEvent(new EmitterDTO<>("users", getUsers(user.getCurrentRoom())), user.getCurrentRoom());
        }
        repository.saveAndFlush(optUser.get());
    }
}