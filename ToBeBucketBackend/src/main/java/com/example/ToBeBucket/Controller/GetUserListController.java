package com.example.ToBeBucket.Controller;

import com.example.ToBeBucket.Service.ProcessFriendService;
import com.example.ToBeBucket.Service.UserProfileService;
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
@RequiredArgsConstructor
@Slf4j
public class GetUserListController {
    private final UserProfileService userProfileService;
    private final ProcessFriendService processFriendService;

    @GetMapping("/tobebucket/friendlist/add")
    public ResponseEntity<Map<String, Object>> getUserList() {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            String userId = SecurityContextHolder.getContext().getAuthentication().getName();

            List<Map<String, Object>> userList = userProfileService.getAllUsersExceptAdminAndSelf(userId);
            List<Map<String, Object>> userListWithStatus = processFriendService.addFriendStatusToUserList(userId, userList);

            // 응답 데이터 구성
            response.put("code", "SU");
            response.put("message", "Success.");
            response.put("userList", userList);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("code", "DE");
            response.put("message", "Failed to fetch user list.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
