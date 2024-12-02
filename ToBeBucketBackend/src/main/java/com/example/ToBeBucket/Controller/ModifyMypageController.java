package com.example.ToBeBucket.Controller;

import com.example.ToBeBucket.DTO.UserProfileDTO;
import com.example.ToBeBucket.Service.UserProfileService;
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
public class ModifyMypageController {
    private final UserProfileService userProfileService;

    @PatchMapping("/tobebucket/mypage/modify")
    public ResponseEntity<Map<String, Object>> updateUserProfile(
            @RequestBody UserProfileDTO updateRequest) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            String userId = SecurityContextHolder.getContext().getAuthentication().getName();

            userProfileService.updateUserProfile(userId, updateRequest);

            response.put("code", "SU");
            response.put("message", "Success.");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("code", "Error");
            response.put("message", "실패.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
