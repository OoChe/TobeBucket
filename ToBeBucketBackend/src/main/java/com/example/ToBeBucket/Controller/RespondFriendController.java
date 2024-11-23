package com.example.ToBeBucket.Controller;

import com.example.ToBeBucket.DTO.ProcessFriendDTO;
import com.example.ToBeBucket.Service.ProcessFriendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
public class RespondFriendController {

    private final ProcessFriendService processFriendService;

    @PatchMapping("/tobebucket/friendlist/respond")
    public ResponseEntity<Map<String, Object>> respondToFriendRequest(
            @RequestBody ProcessFriendDTO processFriendDTO) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            String userId = SecurityContextHolder.getContext().getAuthentication().getName();

            if (processFriendDTO.getFriendStatus() == 1) {
                processFriendService.acceptFriendRequest(processFriendDTO.getFriendId(), userId);
            } else if (processFriendDTO.getFriendStatus() == 2) {
                processFriendService.rejectFriendRequest(processFriendDTO.getFriendId(), userId);
            } else {
                throw new IllegalArgumentException("Invalid friendStatus value. Must be 1 (accept) or 2 (reject).");
            }

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
