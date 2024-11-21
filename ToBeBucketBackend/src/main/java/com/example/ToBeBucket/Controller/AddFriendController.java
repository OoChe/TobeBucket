//package com.example.ToBeBucket.Controller;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.HashMap;
//import java.util.LinkedHashMap;
//import java.util.Map;
//
//@RestController
//@Slf4j
//@RequiredArgsConstructor
//public class AddFriendController {
//    @PostMapping("/tobebucket/friendlist/add")
//    public ResponseEntity<Map<String, Object>> addFriend() {
//        Map<String, Object> response = new LinkedHashMap<>();
//        try {
//            response.put("code", "SU");
//            response.put("message", "Success.");
//
//
//            return ResponseEntity.ok(response);
//        }
//        catch (Exception e) {
//            response.put("code", "DE");
//            response.put("message", e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
//        }
//    }
//}
