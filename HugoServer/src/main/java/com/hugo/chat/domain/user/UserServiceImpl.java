package com.hugo.chat.domain.user;

import com.hugo.chat.model.user.User;
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
    public User createUser(User user) {
        user.setId(null);
        return repository.saveAndFlush(user);
    }

    @Override
    public Collection<User> getUsers() {
        return repository.findAll();
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
    public User updateUser(String id, User user) {
        if (repository.existsById(user.getId()) && id.equals(user.getId().toString())) {
            return repository.saveAndFlush(user);
        } else throw new NoSuchElementException();
    }
}
