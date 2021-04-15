package com.hugo.chat.domain.room;


import com.hugo.chat.domain.event.EventHandler;
import com.hugo.chat.model.emitter.dto.EmitterDTO;
import com.hugo.chat.model.room.Room;
import com.hugo.chat.model.room.dto.RoomDTO;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Comparator;
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

    private void setMainChannel() {
        if (!repository.existsByName("main")) {
            System.err.println("No Main detected");
            repository.saveAndFlush(new Room(UUID.randomUUID(), "main"));
            repository.setMainRoom(Room.MAIN_ROOM_ID);
        }
        System.out.println(repository.findAll().get(0).getId());
    }

    @Override
    public RoomDTO createRoom(RoomDTO dto) {
        if (repository.existsByName(dto.getName()))
            throw new IllegalArgumentException("Name already exists");
        Room room = RoomDTO.toRoom(dto);
        room.setId(null);
        RoomDTO finished = RoomDTO.toDTO(repository.saveAndFlush(room));
        handler.roomEvents(new EmitterDTO<>("rooms", getAllRooms()));
        return finished;
    }

    @Override
    public Collection<RoomDTO> getAllRooms() {
        return repository.findAll().stream()
                .map(RoomDTO::toDTO)
                .sorted(((o1, o2) -> {
                    if (o1.getName().equals("main"))
                        return 1;
                    else if (o2.getName().equals("main"))
                        return -1;
                    else
                        return o1.getName().compareTo(o2.getName());
                }))
                .collect(Collectors.toList());
    }

    @Override
    public RoomDTO updateRoom(RoomDTO dto) {
        if (!repository.existsById(dto.getId()))
            throw new NoSuchElementException("Room ID doesn't exist.");
        if (!repository.existsByName(dto.getName()))
            throw new IllegalArgumentException("Room Name already exists.");
        repository.saveAndFlush(RoomDTO.toRoom(dto));
        handler.roomEvents(new EmitterDTO<>("rooms", getAllRooms()));
        return null;
    }
}
