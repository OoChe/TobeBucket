package com.example.ToBeBucket.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class AchieveBucketDTO {
    private Integer bucketId;
    private Integer stickerId;
    private LocalDate achieveDate;
    private String goalReview;
    private String achievementMedia;
}