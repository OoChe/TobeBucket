package com.example.ToBeBucket.Controller;

import com.example.ToBeBucket.DTO.GetBucketDTO;
import com.example.ToBeBucket.Service.FriendBucketService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
public class GetFriendBucketController {

    private final FriendBucketService friendBucketService;

    @GetMapping("/tobebucket/friendlist/bucket")
    public ResponseEntity<Map<String, Object>> getFriendBucket(
            @RequestParam String userId) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {

            if (userId == null || userId.isEmpty()) {
                throw new IllegalArgumentException("Target userId must be provided.");
            }

            // 프로필 조회
            Map<String, Object> profile = friendBucketService.getUserProfile(userId);

            // 버킷 리스트 조회
            List<Map<String, Object>> bucketList = friendBucketService.getBucketList(userId);

            // 응답 데이터 구성
            response.put("code", "SU");
            response.put("message", "Success.");
            response.put("profile", profile);
            response.put("bucketList", bucketList);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Failed to fetch friend bucket: {}", e.getMessage());
            response.put("code", "DE");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
