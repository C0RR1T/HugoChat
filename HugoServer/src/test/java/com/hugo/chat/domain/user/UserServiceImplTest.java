package com.hugo.chat.domain.user;

import com.hugo.chat.model.user.User;
import com.hugo.chat.model.user.dto.UserDTO;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
class UserServiceImplTest {

    @Mock
    UserRepository repository;

    @InjectMocks
    UserServiceImpl service;

    static List<User> users;

    @BeforeAll
    static void beforeAll() {
        users = List.of(new User(UUID.fromString("df03890e-2d28-42b8-b87b-a587ea0f533a"), "Hugo Boss", System.currentTimeMillis()),
                new User(UUID.fromString("ff7a765a-d07b-4221-a086-1574e07bcbc2"), "Timo Nicolas Angst", System.currentTimeMillis()),
                new User(UUID.fromString("8be6e5fd-3629-4035-a1cc-581aacb37155"), "Noel Schiel Gebhardt", System.currentTimeMillis()),
                new User(UUID.fromString("45a2f3f1-85b6-4cf6-bd2b-347d507a4e22"), "dragon99", System.currentTimeMillis()));
    }

    @Test
    void getUsers() {
        Mockito.when(repository.findAll()).then(invocation -> users);
        assertEquals(service.getUsers().toArray()[0], users.stream().findFirst().map(user -> new UserDTO(user.getId(), user.getName())).get());
    }
}