package com.example.ToBeBucket.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "UserAttendance")
public class UserAttendance {

    @Id
    @Column(name = "userId", nullable = false)
    private String userId; // 외래 키: 사용자 ID

    @Column(name = "monthlyAttendCnt", nullable = true, columnDefinition = "INT DEFAULT 0")
    private Integer monthlyAttendCnt = 0; // 월간 출석 횟수, 기본값 0

    @Column(name = "todayAttendance", nullable = true, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean todayAttendance = false; // 오늘 출석 여부

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", insertable = false, updatable = false)
    private UserLogin userLogin; // 외래 키: UserLogin 테이블의 userId
}