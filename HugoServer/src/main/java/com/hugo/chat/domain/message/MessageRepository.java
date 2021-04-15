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

    /**
     * Get all messages sent before timeStamp that are in a room with the id roomId
     * Ordered by sentOn descending
     */
    @Query(value = "SELECT m FROM Message m WHERE m.sentOn < :timestamp AND m.roomId = :roomId ORDER BY m.sentOn DESC")
    List<Message> getOldMessage(@Param("timestamp") long timeStamp, @Param("roomId") UUID roomId);

    /**
     * Get the amount of messages by a user that were sent after timeStamp
     * Used for ratelimiting.
     */
    @Query(value = "SELECT COUNT(*) FROM Message m WHERE m.userID = :userID AND m.sentOn > :timestamp")
    long getNewestMessageFromUser(@Param("userID") UUID id, @Param("timestamp") long timeStamp);
}
