package com.example.ToBeBucket.Controller;

import com.example.ToBeBucket.DTO.AchieveBucketDTO;
import com.example.ToBeBucket.DTO.SemiGoalDTO;
import com.example.ToBeBucket.Service.AchieveBucketService;
import com.example.ToBeBucket.Service.S3FileUploadService;
import com.example.ToBeBucket.Service.UserProfileService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
public class AchieveBucketController {
    private final AchieveBucketService achieveBucketService; // 서비스 클래스를 주입
    private final UserProfileService userProfileService;
    private final S3FileUploadService s3FileUploadService;

    // 프론트에 sticker process 반환용 Get mapping
    @GetMapping("/tobebucket/home/achievement-record")
    public ResponseEntity<Map<String,Object>> responseStickerProcess(){
        Map<String,Object> response = new LinkedHashMap<>();
        try {
            String userId = SecurityContextHolder.getContext().getAuthentication().getName();
            Integer stickerProcess = userProfileService.getStickerProcessInfo(userId);

            response.put("code", "SU");
            response.put("message", "Success.");
            response.put("stickerProcess", stickerProcess);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("code", "DE");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // 버킷 목표 달성 기록
    @PutMapping("/tobebucket/home/achievement-record")
    public ResponseEntity<Map<String,Object>> recordBucketAchievement(
            @RequestPart("achieveBucketDTO") String achieveRequest,
            @RequestPart(value = "file", required = false) MultipartFile file){
        Map<String,Object> response = new LinkedHashMap<>();
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AchieveBucketDTO achieveBucketDTO = objectMapper.readValue(achieveRequest, AchieveBucketDTO.class);

            //request한 것 DTO로 가져오기
            Integer bucketId = achieveBucketDTO.getBucketId();
            String fileUrl = null;

            // 파일이 존재하는 경우에만 S3 업로드 수행
            if (file != null && !file.isEmpty()) {
                fileUrl = s3FileUploadService.saveFileToS3(file);
                achieveBucketDTO.setAchievementMedia(fileUrl);  // 파일 URL을 DTO에 설정
            }

            // 서비스 호출해서 DB에 저장
            achieveBucketService.saveAchieveBucket(userId, achieveBucketDTO);

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
    //중간 목표 달성 기록 전 스티커 정보 response용도
    @GetMapping("/tobebucket/home/semigoal-record")
    public ResponseEntity<Map<String,Object>> getStickerProcess(){
        Map<String,Object> response = new LinkedHashMap<>();
        try {
            String userId = SecurityContextHolder.getContext().getAuthentication().getName();
            Integer stickerProcess = userProfileService.getStickerProcessInfo(userId);

            response.put("code", "SU");
            response.put("message", "Success.");
            response.put("stickerProcess", stickerProcess);
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
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        try {
            // 서비스 호출해서 DB에 저장
            achieveBucketService.saveSemiGoalAchievement(userId, semiGoalDTO);

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
