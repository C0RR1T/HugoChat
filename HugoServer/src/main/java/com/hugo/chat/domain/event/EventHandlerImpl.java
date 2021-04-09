package com.hugo.chat.domain.event;

import com.hugo.chat.model.message.dto.MessageDTO;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
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

    public void newMessage(MessageDTO message) {
        sendMessage("new messages");
    }

    public void userListChanged() {
        sendMessage("userlist changed");
    }

    public void sendMessage(String message) {
        ArrayList<SseEmitter> deadEmitters = new ArrayList<>();
        emitters.forEach(emitter -> {
            try {
                emitter.send(message);
            } catch (Exception e) {
                deadEmitters.add(emitter);
            }
        });
        emitters.remove(deadEmitters);
    }
}
