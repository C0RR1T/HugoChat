package com.hugo.chat.domain.user;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserWeb {
    private UserService service;

    public UserWeb(UserService service) {
        this.service = service;
    }
}
