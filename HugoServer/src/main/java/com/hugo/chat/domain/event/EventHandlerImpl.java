package com.hugo.chat.domain.event;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

@CrossOrigin
@RestController
public class EventHandlerImpl implements EventHandler{
    private SseEmitter emitter;

    public EventHandlerImpl() {
        this.emitter = new SseEmitter();
    }

    @GetMapping("/update")
    public SseEmitter streamUpdates() {
        return emitter;
    }

    public void newMessage() {
        try {
            emitter.send("new message");
        } catch (IOException i) {
            System.err.println("Sse Emitter had an Error while writing a new message: " + i.getMessage());
        }
    }

    public void userListChanged() {
        try {
            emitter.send("userlist changed");
        } catch (IOException i) {
            System.err.println("Sse Emitter had an Error while writing a new message: " + i.getMessage());
        }
    }
}
