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

    @Query(value = "SELECT * FROM User u WHERE u.id <> :param")
    List<User> getActiveUsers(@Param("param") UUID userID);

    @Query(value = "DELETE FROM User u WHERE u. < :allowedTime ")
    void deleteInactiveUsers(@Param("allowedTime") long allowedTime);
}
