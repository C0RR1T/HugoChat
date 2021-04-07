package com.hugo.chat.model.message.dto;

import java.time.LocalDateTime;

public class MessageDTO {
    private String body;
    private String sentBy;
    private LocalDateTime sentOn;

    public MessageDTO() {
    }

    public MessageDTO(String body, String sentBy, LocalDateTime sentOn) {
        this.body = body;
        this.sentBy = sentBy;
        this.sentOn = sentOn;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getSentBy() {
        return sentBy;
    }

    public void setSentBy(String sentBy) {
        this.sentBy = sentBy;
    }

    public LocalDateTime getSentOn() {
        return sentOn;
    }

    public void setSentOn(LocalDateTime sentOn) {
        this.sentOn = sentOn;
    }
}
