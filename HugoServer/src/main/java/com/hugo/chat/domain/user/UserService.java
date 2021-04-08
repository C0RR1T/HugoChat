package com.hugo.chat.domain.user;

import com.hugo.chat.model.user.dto.UserDTO;

import java.util.Collection;

public interface UserService {
    UserDTO createUser(UserDTO user);
    Collection<UserDTO> getUsers(String id);
    void deleteInactiveUser();
    UserDTO updateUser(String id, UserDTO user);
    void setUserActive(String id);
}
