package com.example.ToBeBucket.Controller;

import com.example.ToBeBucket.DTO.AlarmDTO;
import com.example.ToBeBucket.Service.AlarmService;
import io.swagger.v3.oas.models.links.Link;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@Slf4j
@RequiredArgsConstructor
public class DeleteAlarmController {
    private final AlarmService alarmService;

    @DeleteMapping("/tobebucket/alarm/delete")
    public ResponseEntity<Map<String, Object>> deleteAlarm(
            @RequestBody AlarmDTO alarmDTO) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            alarmService.deleteAlarmsById(alarmDTO.getAlarmIdList());

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
