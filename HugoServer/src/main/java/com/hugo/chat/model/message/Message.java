package com.hugo.chat.model.message;

import com.hugo.chat.model.user.User;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(
                            name = "uuid_gen_strategy_class",
                            value = "org.hibernate.id.uuid.CustomVersionOneStrategy"
                    )
            }
    )
    @Column(name = "messageID", updatable = false, nullable = false)
    private UUID id;
    @Column(length = 1000)
    private String body;
    @Column(name = "sentOn")
    private long sentOn;
    @ManyToOne
    @JoinColumn(name = "UserID_FK", referencedColumnName = "id")
    private User sentBy;

    public Message() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public User getSentBy() {
        return sentBy;
    }

    public void setSentBy(User sentBy) {
        this.sentBy = sentBy;
    }

    public long getSentOn() {
        return sentOn;
    }

    public void setSentOn(long sentOn) {
        this.sentOn = sentOn;
    }
}
