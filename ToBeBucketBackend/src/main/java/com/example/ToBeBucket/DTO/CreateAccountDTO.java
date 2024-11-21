package com.example.ToBeBucket.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateAccountDTO {
    private String userId;
    private String pwd;
    private String nickname;
    private String mbti;
    private String intro;
    private String role;
}