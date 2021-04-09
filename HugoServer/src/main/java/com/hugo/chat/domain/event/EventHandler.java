package com.hugo.chat.domain.event;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface EventHandler {
    SseEmitter streamUpdates();
    void newMessage();
    void userListChanged();
}
