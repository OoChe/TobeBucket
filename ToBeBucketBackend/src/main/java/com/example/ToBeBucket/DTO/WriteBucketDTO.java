package com.example.ToBeBucket.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class WriteBucketDTO {
    private String bucketName;
    private String bucketContent;
    private int category;
    private Boolean publicStatus;
    private String createDate;
    private List<SemiGoalTitleDTO> semiGoalData;
    private String goalDate; //목표 달성 날짜
    private List<String> friendNickNameList;
}
