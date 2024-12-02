package com.example.ToBeBucket.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AlarmDTO {
    private Integer alarmId;
    private String receiveDate;
    private String alarmContent;
    private Boolean readStatus;
    private List<Integer> readAllAlarm;
    private List<AlarmIdWrapper> alarmIdList;

    @Getter
    @Setter
    public static class AlarmIdWrapper {
        private Integer alarmId; // alarmId 필드
    }
}
