package com.example.ToBeBucket.Controller;

import com.example.ToBeBucket.DTO.WriteBucketDTO;
import com.example.ToBeBucket.Service.WriteBucketService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
public class WriteBucketController {
    private final WriteBucketService writeBucketService;
    @PostMapping("/tobebucket/bucket/{userId}/write")
    public ResponseEntity<Map<String,Object>> writeNewBucket(
            @PathVariable String userId,
            @RequestBody WriteBucketDTO writeBucketDTO ){
        Map<String,Object> response = new LinkedHashMap<>();
        try {
            // 서비스 호출해서 DB에 저장
            writeBucketService.saveNewBucket(userId, writeBucketDTO);

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
