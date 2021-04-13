package com.hugo.chat.domain.event;

import com.hugo.chat.model.emitter.EmitterDTO;
import com.hugo.chat.model.message.dto.MessageDTO;
import com.hugo.chat.model.user.dto.UserDTO;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Collection;
import java.util.List;

public interface EventHandler {
    SseEmitter streamUpdates();
    void newEvent(EmitterDTO<?> content);
}
