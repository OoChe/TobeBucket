package com.example.ToBeBucket.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "UserLogin")
public class UserLogin {
    @Id
    @Column(length = 255)
    private String userId;

    @Column(length = 255, nullable = false)
    private String pwd;

    // Getter, Setter
}
