package com.hugo.chat.domain.event;

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

@CrossOrigin
@RestController
public class EventHandlerImpl implements EventHandler {
    private final CopyOnWriteArrayList<SseEmitter> emitters;

    public EventHandlerImpl() {
        this.emitters = new CopyOnWriteArrayList<>();
    }

    @GetMapping("/update")
    public SseEmitter streamUpdates() {
        SseEmitter emitter = new SseEmitter();
        emitters.add(emitter);
        emitter.onCompletion(() -> this.emitters.remove(emitter));
        emitter.onTimeout(() -> this.emitters.remove(emitter));
        return emitter;
    }

    @EventListener
    public void newMessage(MessageDTO message) {
        ArrayList<SseEmitter> deadEmitters = new ArrayList<>();
        emitters.forEach(emitter -> {
            try {
                emitter.send(message, MediaType.APPLICATION_JSON);
            } catch (Exception e) {
                deadEmitters.add(emitter);
            }
        });
        emitters.remove(deadEmitters);
    }

    @EventListener
    public void userListChanged(Collection<UserDTO> users) {
        ArrayList<SseEmitter> deadEmitters = new ArrayList<>();
        emitters.forEach(emitter -> {
            try {
                emitter.send(users, MediaType.APPLICATION_JSON);
            } catch (Exception e) {
                deadEmitters.add(emitter);
            }
        });
        emitters.remove(deadEmitters);
    }
}
