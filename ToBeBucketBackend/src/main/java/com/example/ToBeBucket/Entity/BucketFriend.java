package com.example.ToBeBucket.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "BucketFriend")
public class BucketFriend {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", nullable = false)
    private UserLogin userLogin; // 외래 키: 사용자 ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bucketId", nullable = false)
    private Bucket bucket; // 외래 키: 버킷 ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "friendId", nullable = false)
    private UserLogin friend; // 외래 키: 친구 ID (UserLogin 테이블에서 참조)

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 기본키를 위한 ID, 복합 키 대신 사용할 수 있음. (이 필드는 복합 키 대신 사용할 수 있음)

    // 복합키를 사용하려면, 복합키 클래스를 생성해야 합니다.
}
