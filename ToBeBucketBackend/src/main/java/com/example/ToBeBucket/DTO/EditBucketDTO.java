package com.example.ToBeBucket.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class EditBucketDTO {
    private String bucketContent;
    private Integer category;
    private List<SemiGoalTitleDTO> semiGoalData;
    private String goalDate; //목표 달성 날짜
    private List<String> friendNickNameList;
    private Boolean publicStatus;
}
