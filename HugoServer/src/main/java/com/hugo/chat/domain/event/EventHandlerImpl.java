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
import java.util.concurrent.CopyOnWriteArrayList;

@CrossOrigin
@RestController
public class EventHandlerImpl implements EventHandler {
    private final CopyOnWriteArrayList<SseEmitterWrap> emitters;
    private final CopyOnWriteArrayList<SseEmitter> roomEmitters;

    public EventHandlerImpl() {
        this.roomEmitters = new CopyOnWriteArrayList<>();
        this.emitters = new CopyOnWriteArrayList<>();
    }

    @CrossOrigin
    @GetMapping("/rooms/{roomId}/update")
    public SseEmitter streamUpdates(@PathVariable("roomId") String id) {
        SseEmitterWrap emitterWrap = new SseEmitterWrap(new SseEmitter(-1L), UUID.fromString(id));
        emitters.add(emitterWrap);
        emitterWrap.getEmitter().onCompletion(() -> this.emitters.remove(emitterWrap));
        emitterWrap.getEmitter().onTimeout(() -> this.emitters.remove(emitterWrap));
        return emitterWrap.getEmitter();
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
    public void roomEvents(Collection<RoomDTO> content) {
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
