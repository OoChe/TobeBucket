package com.example.ToBeBucket.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "UserBucket")
public class UserBucket {
    @Id
    @Column(name="userBucketId", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userBucketId;

//    @Column(name="userId", nullable = false)
//    private String userId;

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId", nullable = false)
    private UserLogin userId;

//    @Column(name="bucketId", nullable = false)
//    private Integer bucketId;

    @ManyToOne
    @JoinColumn(name = "bucketId", referencedColumnName = "bucketId", nullable = false)
    private Bucket bucketId;
}
