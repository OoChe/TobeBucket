package com.example.ToBeBucket.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class NotAchvBucketDTO {
    private Integer bucketId;
    private String bucketName;
    private String bucketContent;
    private LocalDate goalDate;
    private Integer category;
}
