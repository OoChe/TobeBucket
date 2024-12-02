package com.example.ToBeBucket.Service;

import com.example.ToBeBucket.DTO.CustomUserDetails;
import com.example.ToBeBucket.Entity.UserLogin;
import com.example.ToBeBucket.Repository.UserLoginRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserLoginRepository userLoginRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //DB에서 조회
        UserLogin userData = userLoginRepository.findByUserId(username);

        //검증하기
        if (userData != null) {
            //UserDetails에 담아서 return하면 AutneticationManager가 검증 함
            return new CustomUserDetails(userData);
        }
        System.out.println("User found: " + userData);
        return null;
    }
}