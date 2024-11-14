package com.example.ToBeBucket.Service;

import com.example.ToBeBucket.DTO.AlarmDTO;
import com.example.ToBeBucket.Entity.UserAlarm;
import com.example.ToBeBucket.Repository.AlarmRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlarmService {
    private final AlarmRepository alarmRepository;

    public List<AlarmDTO> getAlarms() {
        return alarmRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private AlarmDTO convertToDTO(UserAlarm userAlarm) {
        AlarmDTO alarmDTO = new AlarmDTO();
        alarmDTO.setAlarmId(userAlarm.getAlarmId());
        alarmDTO.setReceiveDate(userAlarm.getReceiveDate());
        alarmDTO.setAlarmContent(userAlarm.getAlarmContent());
        alarmDTO.setReadStatus(userAlarm.getReadStatus());
        return alarmDTO;
    }
}
