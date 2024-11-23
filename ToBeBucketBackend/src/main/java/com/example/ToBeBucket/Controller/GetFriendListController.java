package com.example.ToBeBucket.Controller;

import com.example.ToBeBucket.Service.ProcessFriendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
public class GetFriendListController {
    private final ProcessFriendService processFriendService;

    @GetMapping("/tobebucket/friendlist")
    public ResponseEntity<Map<String, Object>> getFriendList() {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            String userId = SecurityContextHolder.getContext().getAuthentication().getName();

            List<Map<String, Object>> friendRequest = processFriendService.getFriendRequests(userId);
            List<Map<String, Object>> friendList = processFriendService.getFriends(userId);

            response.put("code", "SU");
            response.put("message", "Success.");
            response.put("friendRequest", friendRequest);
            response.put("friendList", friendList);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("code", "DE");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
