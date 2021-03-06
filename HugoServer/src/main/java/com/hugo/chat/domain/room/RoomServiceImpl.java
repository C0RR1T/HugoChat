package com.hugo.chat.domain.room;


import com.hugo.chat.domain.event.EventHandler;
import com.hugo.chat.model.room.Room;
import com.hugo.chat.model.room.dto.RoomDTO;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RoomServiceImpl implements RoomService {
    private final RoomRepository repository;
    private final EventHandler handler;

    public RoomServiceImpl(RoomRepository repository, EventHandler handler) {
        this.repository = repository;
        this.handler = handler;
        setMainChannel();
    }

    /**
     * Create a main room if no main channel has been created yet.
     * The main room has a uuid consisting of only 0s and is the default room called by the client
     */
    private void setMainChannel() {
        if (!repository.existsByName("main")) {
            System.err.println("No Main detected");
            repository.saveAndFlush(new Room(UUID.randomUUID(), "main", true));
            repository.setMainRoom(Room.MAIN_ROOM_ID);
            System.out.println("Main created");
        }
    }

    /**
     * Create a new room that can be unlisted
     * The name has to be unique
     */
    @Override
    public RoomDTO createRoom(RoomDTO dto, boolean isListed) {
        if (repository.existsByName(dto.getName()))
            throw new IllegalArgumentException("Name already exists");
        if (dto.getName().length() > 255)
            throw new IllegalArgumentException("Name is longer than 255. Length is: " + dto.getName().length());
        Room room = RoomDTO.toRoom(dto);
        room.setId(null);
        room.setListed(isListed);
        RoomDTO finished = RoomDTO.toDTO(repository.saveAndFlush(room));
        handler.roomEvents(getAllRooms());
        return finished;
    }

    /**
     * Get all listed rooms, sorted by their names, main is always first
     */
    @Override
    public Collection<RoomDTO> getAllRooms() {
        return repository.findAll().stream()
                .filter(Room::isListed)
                .map(RoomDTO::toDTO)
                .sorted(((o1, o2) -> {
                    if (o1.getName().equals("main"))
                        return -1;
                    else if (o2.getName().equals("main"))
                        return 1;
                    else
                        return o1.getName().compareTo(o2.getName());
                }))
                .collect(Collectors.toList());
    }

    /**
     * Updates a room. The name still has to be unique
     */
    @Override
    public RoomDTO updateRoom(RoomDTO dto) {
        if (!repository.existsById(dto.getId()))
            throw new NoSuchElementException("Room ID doesn't exist.");
        if (!repository.existsByName(dto.getName()))
            throw new IllegalArgumentException("Room Name already exists.");
        if (dto.getName().length() > 255)
            throw new IllegalArgumentException("Name is longer than 255. Length is: " + dto.getName().length());
        RoomDTO roomToSend = RoomDTO.toDTO(repository.saveAndFlush(RoomDTO.toRoom(dto)));
        handler.roomEvents(getAllRooms());
        return roomToSend;
    }
}
