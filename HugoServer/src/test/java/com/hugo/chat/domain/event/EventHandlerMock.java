package com.hugo.chat.domain.event;

import com.hugo.chat.model.emitter.EmitterDTO;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public class EventHandlerMock implements EventHandler{
    @Override
    public SseEmitter streamUpdates() {
        return null;
    }

    @Override
    public void newEvent(EmitterDTO<?> content) {
        System.out.println("wow");
    }
}
