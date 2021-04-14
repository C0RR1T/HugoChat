package com.hugo.chat.domain.event;

import com.hugo.chat.model.emitter.SseEmitterWrap;
import com.hugo.chat.model.emitter.dto.EmitterDTO;
import com.hugo.chat.model.room.dto.RoomDTO;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.Collection;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
public class EventHandlerImpl implements EventHandler {
    private final ArrayList<SseEmitterWrap> emitters;
    private final ArrayList<SseEmitter> roomEmitters;

    public EventHandlerImpl(ArrayList<SseEmitter> roomEmitters) {
        this.roomEmitters = roomEmitters;
        this.emitters = new ArrayList<>();
    }

    @CrossOrigin
    @GetMapping("/rooms/{roomId}/update")
    public SseEmitter streamUpdates(@PathVariable String id) {
        SseEmitterWrap emitter = new SseEmitterWrap(new SseEmitter(-1L), UUID.fromString(id));
        emitters.add(emitter);
        emitter.getEmitter().onCompletion(() -> this.emitters.remove(emitter));
        emitter.getEmitter().onTimeout(() -> this.emitters.remove(emitter));
        return emitter.getEmitter();
    }



    @CrossOrigin
    @GetMapping("/rooms/update")
    public SseEmitter streamRoomsUpdate() {
        SseEmitter emitter = new SseEmitter(-1L);
        roomEmitters.add(emitter);
        emitter.onCompletion(() -> this.roomEmitters.remove(emitter));
        emitter.onTimeout(() -> this.roomEmitters.remove(emitter));
        return emitter;
    }

    @Override
    public void roomEvents(EmitterDTO<Collection<RoomDTO>> content) {
        ArrayList<SseEmitter> deadEmitters = new ArrayList<>();
        roomEmitters.forEach(emitter -> {
            try {
                emitter.send(content, MediaType.APPLICATION_JSON);
            } catch (Exception e) {
                deadEmitters.add(emitter);
            }
        });
        roomEmitters.removeAll(deadEmitters);
    }


    public void newEvent(EmitterDTO<?> content, UUID roomId) {
        ArrayList<SseEmitterWrap> deadEmitters = new ArrayList<>();
        emitters.stream().filter(emitter -> emitter.getRoomId().equals(roomId)).forEach(emitter -> {
            try {
                emitter.getEmitter().send(content, MediaType.APPLICATION_JSON);
            } catch (Exception e) {
                deadEmitters.add(emitter);
            }
        });
        emitters.removeAll(deadEmitters);
    }
}
