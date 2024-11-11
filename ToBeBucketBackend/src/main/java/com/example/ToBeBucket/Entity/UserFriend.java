package com.example.ToBeBucket.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(
        name = "UserFriend",
        uniqueConstraints = @UniqueConstraint(columnNames = {"userId", "friendId"}) // userId와 friendId에 복합 유니크 제약 추가
)
public class UserFriend {
    @Id
    private String userId;

    @Id
    private String friendId;

    private int friendStatus;

    @ManyToOne
    @JoinColumn(name = "userId", insertable = false, updatable = false)
    private UserLogin userLogin;

    @ManyToOne
    @JoinColumn(name = "friendId", insertable = false, updatable = false)
    private UserLogin friendUserLogin;
}
