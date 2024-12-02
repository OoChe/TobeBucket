package com.example.ToBeBucket.Controller;

import com.example.ToBeBucket.DTO.UserProfileDTO;
import com.example.ToBeBucket.Service.S3FileUploadService;
import com.example.ToBeBucket.Service.UserProfileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ModifyMypageController {
    private final UserProfileService userProfileService;
    private final S3FileUploadService s3FileUploadService;

    @PatchMapping("/tobebucket/mypage/modify")
    public ResponseEntity<Map<String, Object>> updateUserProfile(
            @RequestPart("updateRequest") UserProfileDTO updateRequest,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            String userId = SecurityContextHolder.getContext().getAuthentication().getName();
            String fileUrl = null;
            // 파일이 존재하는 경우에만 S3 업로드 수행
            if (file != null && !file.isEmpty()) {
                fileUrl = s3FileUploadService.saveFileToS3(file);
                updateRequest.setProfileImage(fileUrl);  // 파일 URL을 DTO에 설정
            }
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
