package com.hugo.chat.domain.message;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/messages")
public class MessageWeb {
    private MessageService service;

    public MessageWeb(MessageService service) {
        this.service = service;
    }
}
