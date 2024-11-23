package com.example.ToBeBucket.Service;

import com.example.ToBeBucket.DTO.CreateAccountDTO;
import com.example.ToBeBucket.Entity.UserLogin;
import com.example.ToBeBucket.Entity.UserProfile;
import com.example.ToBeBucket.Repository.CreateAccountRepository;
import com.example.ToBeBucket.Repository.UserProfileRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CreateAccountService {

    private final CreateAccountRepository createAccountRepository;
    private final UserProfileRepository userProfileRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public void createAccount(CreateAccountDTO createAccountDTO) {
        Optional<UserLogin> existingUser = createAccountRepository.findById(createAccountDTO.getUserId());
        Optional<UserProfile> existingProfile = userProfileRepository.findByNickname(createAccountDTO.getNickname());
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException (createAccountDTO.getUserId()+"는 이미 존재하는 아이디입니다.");
        }else if (existingProfile.isPresent()) {
            throw new IllegalArgumentException (createAccountDTO.getNickname()+"는 이미 존재하는 닉네임입니다.");
        }else{
            UserLogin userLogin = new UserLogin();
            userLogin.setUserId(createAccountDTO.getUserId());
            userLogin.setPwd(bCryptPasswordEncoder.encode(createAccountDTO.getPwd()));
            userLogin.setRole(createAccountDTO.getRole());
            createAccountRepository.save(userLogin);

            UserProfile userProfile = new UserProfile();
            userProfile.setUserId(userLogin.getUserId());
            userProfile.setNickname(createAccountDTO.getNickname());
            userProfile.setMbti(createAccountDTO.getMbti());
            userProfile.setIntro(createAccountDTO.getIntro());
            userProfile.setStickerProcess(createAccountDTO.getStickerProcess());
            userProfile.setUserPoint(createAccountDTO.getUserPoint());
            userProfileRepository.save(userProfile);  // UserProfile 테이블에 저장

        }
    }
}
