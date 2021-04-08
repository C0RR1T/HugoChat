package com.hugo.chat.domain.user;

import com.hugo.chat.model.user.dto.UserDTO;

import java.util.Collection;

public interface UserService {
    UserDTO createUser(UserDTO user);

    Collection<String> getUsers();

    void deleteInactiveUser();

    UserDTO updateUser(UserDTO user);

    void setUserActive(String id);
}
