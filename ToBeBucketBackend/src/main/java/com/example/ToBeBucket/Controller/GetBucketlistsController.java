
package com.example.ToBeBucket.Controller;

import com.example.ToBeBucket.DTO.AchieveBucketDTO;
import com.example.ToBeBucket.DTO.GetBucketDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
public class GetBucketlistsController {

    @GetMapping("/tobebucket/bucketlists")
    public ResponseEntity<Map<String, Object>> getBucketLists(
            @RequestBody GetBucketDTO getBucketDTO) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {

        } catch (Exception e) {
            response.put("code", "DE");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
