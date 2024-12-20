package com.example.ToBeBucket.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class SemiGoalDTO {
    private Integer bucketId;
    private Integer stickerId;
    private Integer semiGoalId;
    private String achieveDate; //달성한 날짜
}

