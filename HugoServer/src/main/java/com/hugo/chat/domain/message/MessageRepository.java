package com.hugo.chat.domain.message;


import com.hugo.chat.model.message.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MessageRepository extends JpaRepository<Message, UUID> {
    @Query(value = "SELECT m FROM messages m WHERE m.messageID <> userID AND m.sentOn > lastChecked")
    List<Message> getNewMessage(@Param("lastChecked") long lastTimeChecked, @Param("userID") UUID id);


}
