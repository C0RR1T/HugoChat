package com.hugo.chat.domain.message.unit;

import com.hugo.chat.domain.message.MessageRepository;
import com.hugo.chat.domain.message.MessageService;
import com.hugo.chat.model.message.Message;
import org.junit.Test;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
public class MessageServiceTest {

    private static UUID roomId = UUID.fromString("00000000-0000-0000-0000-000000000000");

    @InjectMocks
    private MessageService messageService;

    @Mock
    private MessageRepository messageRepository;

    private static List<Message> messages;

    @BeforeAll
    static void setUp() {
        messages = List.of(
                new Message(uuid(), "hallo1", 100, uuid(), "hugo 1", roomId),
                new Message(uuid(), "hallo2", 200, uuid(), "hugo 2", roomId),
                new Message(uuid(), "hallo3", 300, uuid(), "hugo 3", roomId),
                new Message(uuid(), "hallo4", 400, uuid(), "hugo 4", roomId),
                new Message(uuid(), "hallo5", 500, uuid(), "hugo 5", roomId),
                new Message(uuid(), "hallo6", 600, uuid(), "hugo 6", roomId),
                new Message(uuid(), "hallo7", 700, uuid(), "hugo 7", roomId),
                new Message(uuid(), "hallo8", 800, uuid(), "hugo 8", roomId),
                new Message(uuid(), "hallo9", 900, uuid(), "hugo 9", roomId),
                new Message(uuid(), "hallo10", 1000, uuid(), "hugo 10", roomId),
                new Message(uuid(), "hallo11", 1100, uuid(), "hugo 11", roomId)
        );
    }

    @Test
    public void getLatestMessagesTest() {
        Mockito.when(messageRepository.getOldMessage(0, roomId)).thenAnswer(invocation -> messages);

        assertThat(messageRepository.getOldMessage(499, roomId))
                .contains(
                        new Message(uuid(), "hallo1", 100, uuid(), "hugo 1", roomId),
                        new Message(uuid(), "hallo2", 200, uuid(), "hugo 2", roomId),
                        new Message(uuid(), "hallo3", 300, uuid(), "hugo 3", roomId),
                        new Message(uuid(), "hallo4", 400, uuid(), "hugo 4", roomId))
                .doesNotContain(
                        new Message(uuid(), "hallo5", 500, uuid(), "hugo 5", roomId),
                        new Message(uuid(), "hallo6", 600, uuid(), "hugo 6", roomId),
                        new Message(uuid(), "hallo7", 700, uuid(), "hugo 7", roomId),
                        new Message(uuid(), "hallo8", 800, uuid(), "hugo 8", roomId),
                        new Message(uuid(), "hallo9", 900, uuid(), "hugo 9", roomId),
                        new Message(uuid(), "hallo10", 1000, uuid(), "hugo 10", roomId),
                        new Message(uuid(), "hallo11", 1100, uuid(), "hugo 11", roomId));
    }

    static UUID uuid() {
        return UUID.randomUUID();
    }
}
