
package com.example.ToBeBucket.Controller;

import com.example.ToBeBucket.DTO.AchieveBucketDTO;
import com.example.ToBeBucket.DTO.GetBucketDTO;
import com.example.ToBeBucket.Service.GetBucketDetailsService;
import com.example.ToBeBucket.Service.GetBucketlistsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
public class GetBucketlistsController {
    private final GetBucketlistsService getBucketlistsService;
    private final GetBucketDetailsService getBucketDetailsService;

    //버킷리스트 목록 조회
    @GetMapping("/tobebucket/bucketlists")
    public ResponseEntity<Map<String, Object>> getBucketlists(@RequestBody GetBucketDTO getBucketDTO) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            List<?> bucketList = getBucketlistsService.getBucketlists(getBucketDTO);
            response.put("code", "SU");
            response.put("message", getBucketDTO.getAchieveStatus()
                    ? "달성 버킷 목록 조회 Success."
                    : "달성 예정 버킷 목록 조회 Success.");
            response.put("bucketList", bucketList);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("code", "DE");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/tobebucket/bucketlists/{bucketId}")
    public ResponseEntity<Map<String, Object>> getBucketDetail(@PathVariable Integer bucketId) {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            Map<String, Object> bucketListDetail = getBucketDetailsService.getBucketDetail(userId, bucketId);
            response.put("code", "SU");
            response.put("message", "버킷 디테일 반환 Success.");
            response.put("bucketList", bucketListDetail);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("code", "DE");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}