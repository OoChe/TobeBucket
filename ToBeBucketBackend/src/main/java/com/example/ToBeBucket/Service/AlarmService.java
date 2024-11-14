package com.example.ToBeBucket.Service;

import com.example.ToBeBucket.DTO.AlarmDTO;
import com.example.ToBeBucket.Entity.UserAlarm;
import com.example.ToBeBucket.Repository.AlarmRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.beans.Transient;
import java.util.List;
import java.util.Map;
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

    public void deleteAlarmsById(List<AlarmDTO.AlarmIdWrapper> alarmIdList) {
        alarmIdList.forEach(alarmIdWrapper -> {
            Integer alarmId = alarmIdWrapper.getAlarmId(); // alarmId 추출
            if (alarmId != null && alarmRepository.existsById(alarmId)) {
                alarmRepository.deleteById(alarmId);
            }
        });
    }

    @Transactional
    public void markAlarmAsRead(Integer alarmId) {
        if (alarmRepository.existsById(alarmId)) {
            alarmRepository.updateReadStatus(alarmId,true);
        }
    }

    @Transactional
    public void markAllAlarmAsRead(List<Integer> readAllAlarm) {
        alarmRepository.markReadStatusForMultipleAlarms(readAllAlarm, true);
    }
}
