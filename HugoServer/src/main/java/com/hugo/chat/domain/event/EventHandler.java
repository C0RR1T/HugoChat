package com.hugo.chat.domain.event;

import com.hugo.chat.model.emitter.dto.EmitterDTO;
import com.hugo.chat.model.room.dto.RoomDTO;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.UUID;

public interface EventHandler {
    SseEmitter streamUpdates(String id);
    SseEmitter streamRoomsUpdate();
    void roomEvents(EmitterDTO<RoomDTO> content);
    void newEvent(EmitterDTO<?> content, UUID roomId);
}
