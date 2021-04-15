package com.hugo.chat.model.emitter;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.UUID;

public class SseEmitterWrap {
    private SseEmitter emitter;
    private UUID roomId;

    public SseEmitterWrap(SseEmitter emitter, UUID roomId) {
        this.emitter = emitter;
        this.roomId = roomId;
    }

    public SseEmitter getEmitter() {
        return emitter;
    }

    public void setEmitter(SseEmitter emitter) {
        this.emitter = emitter;
    }

    public UUID getRoomId() {
        return roomId;
    }

    public void setRoomId(UUID roomId) {
        this.roomId = roomId;
    }
}
