package com.example.ToBeBucket.Service;

import com.example.ToBeBucket.Entity.UserProfile;
import com.example.ToBeBucket.Repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserProfileService {
    private final UserProfileRepository userProfileRepository;
    public Integer getStickerProcessInfo(String userId){
        Optional<UserProfile> userProfile = userProfileRepository.findByUserId(userId);
        if(userProfile.isPresent()){
            return userProfile.get().getStickerProcess();
        }
        return 0;
    }


}
