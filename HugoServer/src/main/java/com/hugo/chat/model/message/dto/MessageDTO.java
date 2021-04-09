package com.hugo.chat.model.message.dto;

import com.hugo.chat.model.message.Message;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.TimeZone;
import java.util.UUID;

public class MessageDTO {
    private String body;
    private String id;
    private String sentByID;
    private String sentBy;
    private long sentOn;

    public MessageDTO() {
    }

    public MessageDTO(String body, String id, String sentByID, String sentBy, long sentOn) {
        this.body = body;
        this.id = id;
        this.sentByID = sentByID;
        this.sentBy = sentBy;
        this.sentOn = sentOn;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSentByID() {
        return sentByID;
    }

    public void setSentByID(String sentByID) {
        this.sentByID = sentByID;
    }

    public String getSentBy() {
        return sentBy;
    }

    public void setSentBy(String sentBy) {
        this.sentBy = sentBy;
    }

    public long getSentOn() {
        return sentOn;
    }

    public void setSentOn(long sentOn) {
        this.sentOn = sentOn;
    }

    public static Message toMessage(MessageDTO message) {
        Message m = new Message();
        m.setBody(message.getBody());
        m.setSentOn(message.sentOn);
        m.setId((message.getId() != null) ? UUID.fromString(message.getId()) : null);
        m.setUsername(message.getSentBy());
        m.setUserID(UUID.fromString(message.getSentByID()));
        return m;
    }

    public static MessageDTO toMessageDTO(Message message) {
        return new MessageDTO(message.getBody(), message.getId().toString() , message.getUsername(), message.getUserID().toString(), message.getSentOn());
    }
}
