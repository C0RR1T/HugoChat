package com.hugo.chat.domain.user;


import com.hugo.chat.model.user.dto.UserDTO;

import java.util.Collection;
import java.util.UUID;

public interface UserService {
    UserDTO createUser(UserDTO user);

    Collection<UserDTO> getUsers(UUID roomId);

    void deleteInactiveUser();

    UserDTO updateUser(UserDTO user);

    void setUserActive(String id, String roomId);
}
