package com.example.ToBeBucket.Controller;

import com.example.ToBeBucket.DTO.EditBucketDTO;
import com.example.ToBeBucket.DTO.WriteBucketDTO;
import com.example.ToBeBucket.Service.ManageBucketService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ManageBucketController {

    private final ManageBucketService manageBucketService;

    //버킷작성하기
    @PostMapping("/tobebucket/bucket/{userId}/write")
    public ResponseEntity<Map<String,Object>> writeNewBucket(
            @PathVariable String userId,
            @RequestBody WriteBucketDTO writeBucketDTO ){
        Map<String,Object> response = new LinkedHashMap<>();
        try {
            // 서비스 호출해서 DB에 저장
            manageBucketService.saveNewBucket(userId, writeBucketDTO);

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

    @PatchMapping("/tobebucket/bucket-edit/{userId}/{bucketId}")
    public ResponseEntity<Map<String,Object>> editBucket(
            @PathVariable String userId,@PathVariable Integer bucketId,
            @RequestBody EditBucketDTO editBucketDTO){
        Map<String,Object> response = new LinkedHashMap<>();
        try {
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
