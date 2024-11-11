package com.example.ToBeBucket.Entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "BucketAchievement")
public class BucketAchievement {

    @Id
    @Column(name = "bucketId")
    private Integer bucketId;

    @Column(name = "achieveDate", nullable = false)
    private LocalDate achieveDate;

    @Column(name = "goalReview", length = 255)
    private String goalReview;

    @Column(name = "achievementMedia", length = 255)
    private String achievementMedia;

    @Column(name = "stickerId", nullable = false)
    private Integer stickerId;

    @OneToOne
    @JoinColumn(name = "bucketId", referencedColumnName = "bucketId", insertable = false, updatable = false)
    private Bucket bucket;

    @ManyToOne
    @JoinColumn(name = "stickerId", referencedColumnName = "stickerId", insertable = false, updatable = false)
    private Sticker sticker;
}