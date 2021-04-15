package com.hugo.chat.domain.event;

import com.hugo.chat.model.emitter.dto.EmitterDTO;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.UUID;

public class EventHandlerMock{

    public SseEmitter streamUpdates(String id) {
        return null;
    }


    public SseEmitter roomEvents(String id) {
        return null;
    }


    public void roomEvent() {

    }


    public void newEvent(EmitterDTO<?> content, UUID roomId) {

    }
}
