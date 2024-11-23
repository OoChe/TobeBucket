package com.example.ToBeBucket.Controller;

import com.example.ToBeBucket.DTO.EditBucketDTO;
import com.example.ToBeBucket.DTO.WriteBucketDTO;
import com.example.ToBeBucket.Service.ManageBucketService;
import com.example.ToBeBucket.Service.UserFriendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ManageBucketController {

    private final ManageBucketService manageBucketService;
    private final UserFriendService userFriendService;
    //버킷 작성 페이지 접근 시
    @GetMapping("/tobebucket/bucket/write")
    public ResponseEntity<Map<String,Object>> getFriendListsForCreateBucket(){
        Map<String,Object>  response = new LinkedHashMap<>();
        try{
            String userId = SecurityContextHolder.getContext().getAuthentication().getName();
            List<String> friendNicknameList = userFriendService.getFriendLists(userId);
            response.put("code", "SU");
            response.put("message", "Success.");
            response.put("friendNicknameList",friendNicknameList);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            response.put("code", "DE");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    //버킷작성하기
    @PostMapping("/tobebucket/bucket/write")
    public ResponseEntity<Map<String,Object>> writeNewBucket(
            @RequestBody WriteBucketDTO writeBucketDTO ){
        Map<String,Object> response = new LinkedHashMap<>();
        try {
            String userId = SecurityContextHolder.getContext().getAuthentication().getName();
            // 서비스 호출해서 DB에 저장
            Integer bucketId = manageBucketService.saveNewBucket(userId, writeBucketDTO);

            //response해주기
            response.put("code", "SU");
            response.put("message", "Success.");
            response.put("bucketId", bucketId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("code", "DE");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PatchMapping("/tobebucket/bucket-edit/{bucketId}")
    public ResponseEntity<Map<String,Object>> editBucket(
            @PathVariable Integer bucketId,
            @RequestBody EditBucketDTO editBucketDTO){
        Map<String,Object> response = new LinkedHashMap<>();
        try {
            String userId = SecurityContextHolder.getContext().getAuthentication().getName();
            // 서비스 호출해서 DB에 저장
            manageBucketService.editBucket(userId, bucketId, editBucketDTO);
            //response해주기
            response.put("code", "SU");
            response.put("message", "Success.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("code", "DE");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/tobebucket/bucket-delete/{bucketId}")
    public ResponseEntity<Map<String,Object>> deleteBucket(@PathVariable Integer bucketId){
        Map<String,Object> response = new LinkedHashMap<>();
        try {
            // 서비스 호출해서 DB에서 삭제하기
            manageBucketService.deleteBucket(bucketId);
            //response해주기
            response.put("code", "SU");
            response.put("message", "Delete Success.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("code", "DE");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }

    }

}
