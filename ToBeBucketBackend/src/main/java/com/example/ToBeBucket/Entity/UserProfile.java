package com.example.ToBeBucket.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "UserProfile")
public class UserProfile {
    @Id
    private String userId;

    @Column(length = 50, unique = true)
    private String nickname;

    private String intro;
    private String mbti;
    private String profileImage;

    @OneToOne
    @JoinColumn(name="userId", foreignKey = @ForeignKey(name="fk_user_profile"))
    private UserLogin userLogin;

    // Getter, Setter

}

