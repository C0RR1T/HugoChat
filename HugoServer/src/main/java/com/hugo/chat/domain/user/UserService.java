package com.hugo.chat.domain.user;

import com.hugo.chat.model.user.User;

import java.util.Collection;

public interface UserService {
    User createUser(User user);
    Collection<User> getUsers();
    void deleteInactiveUser();
    User updateUser(String id, User user);
}
