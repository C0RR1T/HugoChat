package com.hugo.chat.domain.user;

import com.hugo.chat.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    void deleteUsersById(List<UUID> ids);
    @Query(value = "SELECT u FROM users u WHERE u.userID <> param")
    List<User> getActiveUsers(@Param("param") UUID userID);
}
