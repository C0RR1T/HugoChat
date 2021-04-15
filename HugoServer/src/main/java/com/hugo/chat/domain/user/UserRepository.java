package com.hugo.chat.domain.user;

import com.hugo.chat.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    /**
     * Delete all users that have last been active before allowedTime
     */
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM User u WHERE u.lastActive < :allowedTime")
    void deleteInactiveUsers(@Param("allowedTime") long allowedTime);

    /**
     * Get the amount of users in a room currentRoom
     */
    @Query(value = "SELECT COUNT(*) FROM User u WHERE u.currentRoom = :currentRoom")
    long getUserCountInRoom(@Param("currentRoom") UUID currentRoom);

    /**
     * Get all users in a room currentRoom
     */
    @Query(value = "SELECT u FROM User u WHERE u.currentRoom = :currentRoom")
    List<User> getUsersByRoom(@Param("currentRoom") UUID currentRoom);

}
