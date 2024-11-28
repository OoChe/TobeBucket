package com.example.ToBeBucket.Controller;

import com.example.ToBeBucket.DTO.ProcessFriendDTO;
import com.example.ToBeBucket.Service.ProcessFriendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@Slf4j
@RequiredArgsConstructor
public class DeleteFriendController {
    private final ProcessFriendService processFriendService;
    @DeleteMapping("/tobebucket/friendlist/delete")
    public ResponseEntity<Map<String, Object>> deleteFriend(
            @RequestBody ProcessFriendDTO processFriendDTO) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            String userId = SecurityContextHolder.getContext().getAuthentication().getName();

            processFriendService.deleteFriendByUserId(userId, processFriendDTO.getFriendId());

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
