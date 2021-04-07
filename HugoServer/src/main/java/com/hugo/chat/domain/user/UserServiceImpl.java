package com.hugo.chat.domain.user;

import com.hugo.chat.model.user.User;
import com.hugo.chat.model.user.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository repository;

    public UserServiceImpl(UserRepository repository) {
        this.repository = repository;
        deleteInactiveUser();
    }

    @Override
    public UserDTO createUser(UserDTO user) {
        user.setId(null);
        User u = repository.saveAndFlush(UserDTO.toUser(user));
        return new UserDTO(u.getId(), u.getName());
    }

    @Override
    public Collection<UserDTO> getUsers(String id) {
        return repository.getActiveUsers(UUID.fromString(id)).stream()
                .map(user -> new UserDTO(user.getId(), user.getName())).collect(Collectors.toList());
    }

    @Override
    public void deleteInactiveUser() {
        Timer timer = new Timer();
        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                List<UUID> inactiveUsers = repository.findAll().stream().
                        filter(user -> user.getLastChecked() < System.currentTimeMillis() - 10000).map(User::getId).collect(Collectors.toList());
                repository.deleteUsersById(inactiveUsers);
            }
        }, 0, 10000);
    }

    @Override
    public UserDTO updateUser(String id, UserDTO user) {
        Optional<User> opt = repository.findById(UUID.fromString(id));
        if (opt.isPresent()) {
            User u = opt.get();
            u.setName(user.getUsername());
            repository.saveAndFlush(u);
            return new UserDTO(u.getId(), u.getName());
        } else throw new NoSuchElementException();
    }
}
