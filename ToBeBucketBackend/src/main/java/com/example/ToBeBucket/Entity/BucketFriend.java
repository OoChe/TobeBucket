package com.example.ToBeBucket.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="BucketFriend")
public class BucketFriend {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", nullable = false)
    private UserLogin userLogin; // 외래 키: 사용자 ID

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "bucketId", nullable = false)
    private Bucket bucket; // 외래 키: 버킷 ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "friendId", nullable = false)
    private UserLogin friend; // 외래 키: 친구 ID (UserLogin 테이블에서 참조)

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="bucket_friend_id")
    private Integer bucket_friend_id;
}
