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
    @Query(value = "SELECT m FROM Message m WHERE m.sentOn > :lastChecked ORDER BY m.sentOn DESC")
    List<Message> getNewMessage(@Param("lastChecked") long lastTimeChecked);

    @Query(value = "SELECT m FROM Message m WHERE m.sentOn < :timestamp ORDER BY m.sentOn")
    List<Message> getOldMessage(@Param("timestamp") long timeStamp);

    @Query(value = "SELECT COUNT(*) FROM Message m WHERE m.userID = :userID AND m.sentOn > :timestamp")
    long getNewestMessageFromUser(@Param("userID") UUID id, @Param("timestamp") long currentTime);
}
