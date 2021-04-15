package com.hugo.chat.domain.room;

import com.hugo.chat.model.room.dto.RoomDTO;

import java.util.Collection;


public interface RoomService {
    RoomDTO createRoom(RoomDTO dto);
    Collection<RoomDTO> getAllRooms();
    RoomDTO updateRoom(RoomDTO dto);


}
