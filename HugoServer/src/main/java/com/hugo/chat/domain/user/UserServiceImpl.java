package com.hugo.chat.domain.user;

import com.hugo.chat.domain.event.EventHandlerImpl;
import com.hugo.chat.model.user.User;
import com.hugo.chat.model.user.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository repository;
    private final EventHandlerImpl eventHandler;

    public UserServiceImpl(UserRepository repository, EventHandlerImpl eventHandler) {
        this.repository = repository;
        this.eventHandler = eventHandler;
        deleteInactiveUser();
    }

    @Override
    public UserDTO createUser(UserDTO user) {
        if (user.getUsername().length() <= 255) {
            user.setId(null);
            User u = UserDTO.toUser(user);
            u.setLastActive(System.currentTimeMillis());
            u = repository.saveAndFlush(u);
            eventHandler.userListChanged(getUsers());
            return new UserDTO(u.getId(), u.getName());
        } else throw new IllegalArgumentException("Message is too long");
    }

    @Override
    public Collection<UserDTO> getUsers() {
        return repository.findAll().stream().
                sorted((o1, o2) -> -Long.compare(o1.getLastActive(), o2.getLastActive()))
                .map(user -> new UserDTO(user.getId(), user.getName())).collect(Collectors.toList());
    }

    @Override
    public void deleteInactiveUser() {
        Timer timer = new Timer();
        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                long count = repository.count();
                repository.deleteInactiveUsers(System.currentTimeMillis() - 10000); //10000ms -> 10 sec
                if(repository.count() < count)
                    eventHandler.userListChanged(getUsers());
            }
        }, 10000, 10000);
    }

    @Override
    public UserDTO updateUser(UserDTO user) {
        if (user.getUsername().length() <= 255) {
            Optional<User> opt = repository.findById(user.getId());
            if (opt.isPresent()) {
                User u = opt.get();
                u.setName(user.getUsername());
                repository.saveAndFlush(u);
                eventHandler.userListChanged(getUsers());
                return new UserDTO(u.getId(), u.getName());
            } else throw new NoSuchElementException();
        } else throw new IllegalArgumentException();
    }

    @Override
    public void setUserActive(String id) {
        Optional<User> user = repository.findById(UUID.fromString(id));
        if (user.isPresent()) {
            user.get().setLastActive(System.currentTimeMillis());
            repository.saveAndFlush(user.get());
        } else throw new NoSuchElementException();
    }
}