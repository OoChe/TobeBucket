package com.example.ToBeBucket.Controller;

import com.example.ToBeBucket.Entity.UserFriend;
import com.example.ToBeBucket.Service.FriendListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


@RestController
@Slf4j
@RequiredArgsConstructor
public class FriendListController {
    private final FriendListService friendListService;
    @GetMapping("/tobebucket/{userId}/friendlist")
    public ResponseEntity<Map<String,Object>> getFriendList(@PathVariable String userId){
        Map <String,Object> response = new LinkedHashMap<>();
        try{
            List<UserFriend> friendList = friendListService.getFriendList(userId);
            response.put("code", "SU");
            response.put("message", "Success.");
            response.put("friends", friendList); // 조회한 목록을 응답에 추가
            return ResponseEntity.ok(response);
        }catch (Exception e){
            response.put("code", "DE");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
