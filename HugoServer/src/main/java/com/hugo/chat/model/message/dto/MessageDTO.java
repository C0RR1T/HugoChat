package com.hugo.chat.model.message.dto;

import com.hugo.chat.model.message.Message;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.TimeZone;

public class MessageDTO {
    private String body;
    private String sentByID;
    private String sentBy;
    private long sentOn;

    public MessageDTO() {
    }

    public MessageDTO(String body, String sentBy, long sentOn, String sentByID) {
        this.body = body;
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
        m.setSentOn(LocalDateTime.ofInstant(Instant.ofEpochMilli(message.getSentOn()), TimeZone.getTimeZone("UTC").toZoneId()));
        return m;
    }

    public static MessageDTO toMessageDTO(Message message) {
        return new MessageDTO(message.getBody(), message.getSentBy().getName(), message.getSentOn().atZone(ZoneId.of("UTC")).toInstant().toEpochMilli() , message.getSentBy().getId().toString());
    }
}
