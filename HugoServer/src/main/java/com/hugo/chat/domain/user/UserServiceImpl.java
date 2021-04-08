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
        User u = UserDTO.toUser(user);
        u.setLastActive(System.currentTimeMillis());
        u = repository.saveAndFlush(u);
        return new UserDTO(u.getId(), u.getName());
    }

    @Override
    public Collection<String> getUsers() {
        return repository.findAll().stream()
                .map(User::getName).collect(Collectors.toList());
    }

    @Override
    public void deleteInactiveUser() {
        Timer timer = new Timer();
        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                repository.deleteInactiveUsers(System.currentTimeMillis() - 10000); //10000ms -> 10 sec
            }
        }, 0, 10000);
    }

    @Override
    public UserDTO updateUser(UserDTO user) {
        Optional<User> opt = repository.findById(user.getId());
        if (opt.isPresent()) {
            User u = opt.get();
            u.setName(user.getUsername());
            repository.saveAndFlush(u);
            return new UserDTO(u.getId(), u.getName());
        } else throw new NoSuchElementException();
    }

    @Override
    public void setUserActive(String id) {
        Optional<User> user = repository.findById(UUID.fromString(id));
        if (user.isPresent()) {
            user.get().setLastActive(System.currentTimeMillis());
        } else throw new NoSuchElementException();
    }
}
