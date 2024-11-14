package com.example.ToBeBucket.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "UserPoint")
public class UserPoint {

    @Id
    @Column(name = "userId", nullable = false)
    private String userId; // 외래 키: 사용자 ID

    @Column(name = "point", nullable = true, columnDefinition = "INT DEFAULT 0")
    private Integer point = 0; // 포인트, 기본값 0

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", insertable = false, updatable = false)
    private UserLogin userLogin; // 외래 키: UserLogin 테이블의 userId
}
