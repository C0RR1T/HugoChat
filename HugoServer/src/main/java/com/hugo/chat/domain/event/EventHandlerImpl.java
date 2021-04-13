package com.hugo.chat.domain.event;

import com.hugo.chat.model.emitter.EmitterDTO;
import com.hugo.chat.model.message.Message;
import com.hugo.chat.model.message.dto.MessageDTO;
import com.hugo.chat.model.user.User;
import com.hugo.chat.model.user.dto.UserDTO;
import org.springframework.context.event.EventListener;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.concurrent.CopyOnWriteArrayList;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
public class EventHandlerImpl implements EventHandler {
    private final CopyOnWriteArrayList<SseEmitter> emitters;

    public EventHandlerImpl() {
        this.emitters = new CopyOnWriteArrayList<>();
    }

    @CrossOrigin
    @GetMapping("/update")
    public SseEmitter streamUpdates() {
        SseEmitter emitter = new SseEmitter(-1L);
        emitters.add(emitter);
        emitter.onCompletion(() -> this.emitters.remove(emitter));
        emitter.onTimeout(() -> this.emitters.remove(emitter));
        return emitter;
    }

    @EventListener
    public void newEvent(EmitterDTO<?> content) {
        ArrayList<SseEmitter> deadEmitters = new ArrayList<>();
        emitters.forEach(emitter -> {
            try {
                emitter.send(content, MediaType.APPLICATION_JSON);
            } catch (Exception e) {
                deadEmitters.add(emitter);
            }
        });
        emitters.removeAll(deadEmitters);
    }
}
