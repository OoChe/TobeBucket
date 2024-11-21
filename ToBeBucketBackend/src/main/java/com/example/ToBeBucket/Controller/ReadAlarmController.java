package com.example.ToBeBucket.Controller;

import com.example.ToBeBucket.DTO.AlarmDTO;
import com.example.ToBeBucket.Service.AlarmService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ReadAlarmController {
    private final AlarmService alarmService;

    @PostMapping("/tobebucket/alarm/read")
    public ResponseEntity<Map<String, Object>> readAlarm(
            @RequestBody AlarmDTO alarmDTO) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            if (alarmDTO.getAlarmId() != null) {
                // 단일 알람 읽기
                alarmService.markAlarmAsRead(alarmDTO.getAlarmId());
            } else if (alarmDTO.getReadAllAlarm() != null && !alarmDTO.getReadAllAlarm().isEmpty()) {
                // 여러 알람 읽기
                alarmService.markAllAlarmAsRead(alarmDTO.getReadAllAlarm());
            }

            response.put("code", "SU");
            response.put("message", "Success.");

            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            response.put("code", "DE");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
