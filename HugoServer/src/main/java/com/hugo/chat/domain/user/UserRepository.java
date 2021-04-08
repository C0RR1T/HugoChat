package com.hugo.chat.domain.user;

import com.hugo.chat.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM User u WHERE u.lastActive < :allowedTime ")
    void deleteInactiveUsers(@Param("allowedTime") long allowedTime);
}
