package com.example.ToBeBucket.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "UserAlarm")
public class UserAlarm {

    @Id
    @Column(name = "userId", nullable = false)
    private String userId; // 외래 키: 사용자 ID

    @Column(name = "alarmId", nullable = false)
    private Integer alarmId; // 알람 ID

    @Column(name = "alarmContent", nullable = false, columnDefinition = "LONGTEXT")
    private String alarmContent; // 알람 내용

    @Column(name = "readStatus", nullable = false, columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean readStatus = false; // 읽음 여부, 기본값 false

    @Column(name = "receiveDate", nullable = false)
    private LocalDateTime receiveDate; // 알람 수신 날짜

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", insertable = false, updatable = false)
    private UserLogin userLogin; // 외래 키: UserLogin 테이블의 userId
}
