package com.example.ToBeBucket.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AlarmDTO {
    private Integer alarmId;
    private String receiveDate;
    private String alarmContent;
    private Boolean readStatus;
}
