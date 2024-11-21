package com.example.ToBeBucket.Controller;

import com.example.ToBeBucket.DTO.AlarmDTO;
import com.example.ToBeBucket.Service.AlarmService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ViewAlarmController {

    private final AlarmService alarmService;

    @GetMapping("/tobebucket/alarm")
    public ResponseEntity<Map<String, Object>> viewAlarm() {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            List<AlarmDTO> alarmList = alarmService.getAlarms();

            response.put("code", "SU");
            response.put("message", "Success.");
            response.put("alarmList", alarmList);

            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            response.put("code", "DE");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
