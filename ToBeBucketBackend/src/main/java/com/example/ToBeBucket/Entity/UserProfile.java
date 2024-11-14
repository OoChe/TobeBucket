package com.example.ToBeBucket.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(
        name = "UserProfile",
        uniqueConstraints = @UniqueConstraint(columnNames = {"userId", "mbti"}) // userId와 mbti 복합 유니크 제약 추가
)
public class UserProfile {
    @Id
    private String userId;

    @Column(length = 50, unique = true)
    private String nickname;

    private String intro;
    private String mbti;
    private String profileImage;

    @OneToOne
    @JoinColumn(name = "userId", foreignKey = @ForeignKey(name = "fk_user_profile"))
    private UserLogin userLogin;
}
