package com.hugo.chat.domain.message;

import com.hugo.chat.domain.event.EventHandler;
import com.hugo.chat.domain.user.UserRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
class MessageServiceImplTest {
    @Mock
    private MessageRepository repository;

    @Mock
    private EventHandler handler;

    @Mock
    private UserRepository userRepo;

    @InjectMocks
    private MessageServiceImpl impl;

    @BeforeAll
    public void setUp() {
        impl = new MessageServiceImpl(repository, userRepo, handler);
    }

    @Test
    void createMessage() {
    }

    @Test
    void getAllMessages() {
    }

    @Test
    void getNewMessages() {
    }
}