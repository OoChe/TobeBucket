package com.example.ToBeBucket.Controller;

import com.example.ToBeBucket.DTO.AchieveBucketDTO;
import com.example.ToBeBucket.DTO.SemiGoalDTO;
import com.example.ToBeBucket.Service.AchieveBucketService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
public class AchieveBucketController {
    private final AchieveBucketService achieveBucketService; // 서비스 클래스를 주입

    // 버킷 목표 달성 기록
    @PutMapping("/tobebucket/home/achievement-record")
    public ResponseEntity<Map<String,Object>> recordBucketAchievement(
            @RequestBody AchieveBucketDTO achieveBucketDTO){
        Map<String,Object> response = new LinkedHashMap<>();
        try {
            //request한 것 DTO로 가져오기
            Integer bucketId = achieveBucketDTO.getBucketId();

            // 서비스 호출해서 DB에 저장
            achieveBucketService.saveAchieveBucket(achieveBucketDTO);

            //response해주기
            response.put("code", "SU");
            response.put("message", "Success.");
            response.put("bucketId", String.valueOf(bucketId));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("code", "DE");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    //중간목표 달성기록
    @PutMapping("/tobebucket/home/semigoal-record")
    public ResponseEntity<Map<String,Object>> recordSemiGoal(
            @RequestBody SemiGoalDTO semiGoalDTO){
        Map<String,Object> response = new LinkedHashMap<>();
        try {
            // 서비스 호출해서 DB에 저장
            achieveBucketService.saveSemiGoalAchievement(semiGoalDTO);

            //response해주기
            response.put("code", "SU");
            response.put("message", "Success.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("code", "DE");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
