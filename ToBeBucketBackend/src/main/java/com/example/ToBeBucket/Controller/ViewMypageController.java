package com.example.ToBeBucket.Controller;

import com.example.ToBeBucket.Service.MypageService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ViewMypageController {
    private final MypageService mypageService;

    @GetMapping("/tobebucket/mypage")
    public ResponseEntity<Map<String, Object>> getMyPage() {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            String userId = SecurityContextHolder.getContext().getAuthentication().getName();

            Map<String, Object> myPageData = mypageService.getMyPageData(userId);

            response.put("code", "SU");
            response.put("message", "Success.");
            response.putAll(myPageData);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("code", "DE");
            response.put("message", "Fail");
            return ResponseEntity.internalServerError().body(response);
        }
    }
}
