package com.example.ToBeBucket.Controller;

import com.example.ToBeBucket.Service.FriendFeedService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
public class GetFriendFeedController {
    private final FriendFeedService friendFeedService;

    @GetMapping("/tobebucket/feed/friend")
    public ResponseEntity<Map<String, Object>> getFriendFeed() {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            // 현재 로그인된 사용자 ID 가져오기
            String userId = SecurityContextHolder.getContext().getAuthentication().getName();

            // 친구들의 피드 데이터 가져오기
            var bucketList = friendFeedService.getFriendBuckets(userId);

            response.put("code", "SU");
            response.put("message", "Success.");
            response.put("bucketList", bucketList);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("code", "DE");
            response.put("message", "Failed to fetch friend feed.");
            return ResponseEntity.internalServerError().body(response);
        }
    }
}
