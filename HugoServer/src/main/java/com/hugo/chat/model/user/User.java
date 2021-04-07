package com.hugo.chat.model.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User {
    @Id
    @Column(name = "userID")
    private UUID id;
    @Column(name = "")
    private String name;

}
