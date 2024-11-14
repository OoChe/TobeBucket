package com.example.ToBeBucket.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "BucketSemiGoal")
public class BucketSemiGoal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer semiGoalId; // 중간목표 ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bucketId", nullable = false)
    private Bucket bucket; // 외래 키: 버킷 ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stickerId", nullable = false)
    private Sticker sticker; // 외래 키: 스티커 ID

    @Column(nullable = false, length = 255)
    private String semiGoalTitle; // 중간목표 제목

    @Column(nullable = true)
    private LocalDate achieveDate; // 중간목표 달성일 (optional)

}
