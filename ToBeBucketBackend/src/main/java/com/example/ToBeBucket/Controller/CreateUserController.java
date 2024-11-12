package com.example.ToBeBucket.Controller;

import com.example.ToBeBucket.DTO.CreateAccountDTO;
import com.example.ToBeBucket.Service.CreateAccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
public class CreateUserController {
    private final CreateAccountService createAccountService;

    @PostMapping("/tobebucket/signup")
    public ResponseEntity<Map<String,Object>> createAccount(
            @RequestBody CreateAccountDTO createAccountDTO){
        Map<String,Object> response = new LinkedHashMap<>();
        try {
            // 서비스 호출해서 DB에 저장
            createAccountService.createAccount(createAccountDTO);

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

}
