package com.example.ToBeBucket.Service;

import com.example.ToBeBucket.DTO.UserProfileDTO;
import com.example.ToBeBucket.Entity.UserProfile;
import com.example.ToBeBucket.Repository.BucketRepository;
import com.example.ToBeBucket.Repository.UserProfileRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserProfileService {
    private final UserProfileRepository userProfileRepository;
    private final BucketRepository bucketRepository;

    public Integer getStickerProcessInfo(String userId){
        Optional<UserProfile> userProfile = userProfileRepository.findByUserId(userId);
        if(userProfile.isPresent()){
            return userProfile.get().getStickerProcess();
        }
        return 0;
    }

    @Transactional
    public void updateUserProfile(String userId, UserProfileDTO updateRequest) {
        UserProfile userProfile = userProfileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User profile not found for userId: " + userId));

        // MBTI 변경 시, Bucket 테이블의 mbti 필드도 업데이트
        if (updateRequest.getMbti() != null && !updateRequest.getMbti().equals(userProfile.getMbti())) {
            userProfile.setMbti(updateRequest.getMbti());
            userProfileRepository.save(userProfile); // Hibernate는 UserProfile만 관리
        }

        // 선택적 필드 업데이트
        if (updateRequest.getNickname() != null) {
            userProfile.setNickname(updateRequest.getNickname());
        }
        if (updateRequest.getIntro() != null) {
            userProfile.setIntro(updateRequest.getIntro());
        }
        if (updateRequest.getProfileImage() != null) {
            userProfile.setProfileImage(updateRequest.getProfileImage());
        }

        userProfileRepository.save(userProfile);
    }

    public List<Map<String, Object>> getAllUsersExceptAdminAndSelf(String currentUserId) {
        return userProfileRepository.findAllUsersExceptAdminAndSelf(currentUserId);
    }

}
