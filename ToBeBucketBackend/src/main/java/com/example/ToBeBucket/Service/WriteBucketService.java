package com.example.ToBeBucket.Service;

import com.example.ToBeBucket.DTO.SemiGoalTitleDTO;
import com.example.ToBeBucket.DTO.WriteBucketDTO;
import com.example.ToBeBucket.Entity.*;
import com.example.ToBeBucket.Repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class WriteBucketService {
    private final BucketRepository bucketRepository;
    private final UserProfileRepository userProfileRepository;
    private final BucketFriendRepository bucketFriendRepository;
    private final UserLoginRepository userLoginRepository;
    private final BucketSemiGoalRepository bucketSemiGoalRepository;

    @Transactional
    public void saveNewBucket(String userId, WriteBucketDTO writeBucketDTO) {
        UserLogin user = userLoginRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("없는 사용자"));

        UserProfile userProfile = userProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("사용자 프로필 정보 없음"));
        Bucket bucket = getBucket(userId, writeBucketDTO, userProfile);
        bucketRepository.save(bucket);

        //BucketFriend 생성할지 말지 결정
        if (writeBucketDTO.getFriendNickNameList() != null) {
                for (String friendNickName : writeBucketDTO.getFriendNickNameList()) {
                    // UserProfile에서 친구의 nickname을 기반으로 UserLogin 조회
                    UserProfile friendProfile = userProfileRepository.findByNickname(friendNickName)
                            .orElseThrow(() -> new RuntimeException("존재하지 않는 친구 닉네임입니다."));
                    UserLogin friend = friendProfile.getUserLogin();

                    BucketFriend bucketFriend = new BucketFriend();
                    bucketFriend.setUserLogin(user);
                    bucketFriend.setBucket(bucket);
                    bucketFriend.setFriend(friend);

                    bucketFriendRepository.save(bucketFriend);
                }
        }

        //SemiGoalBucket 생성할지 말지 결정
        if (writeBucketDTO.getSemiGoalData()!= null) {
            for (SemiGoalTitleDTO semiGoalTitleDTO : writeBucketDTO.getSemiGoalData()) {
                String semiGoalTitle = semiGoalTitleDTO.getSemiGoalTitle();
                BucketSemiGoal bucketSemiGoal = new BucketSemiGoal();
                bucketSemiGoal.setSemiGoalTitle(semiGoalTitle);
                bucketSemiGoal.setBucket(bucket); //여기서 id가 저장됨
                bucketSemiGoalRepository.save(bucketSemiGoal);
            }
        }

    }

    private static Bucket getBucket(String userId, WriteBucketDTO writeBucketDTO, UserProfile userProfile) {
        String userMbti = userProfile.getMbti();

        Bucket bucket = new Bucket();
        bucket.setUserId(userId);
        bucket.setMbti(userMbti);
        bucket.setBucketName(writeBucketDTO.getBucketName());
        bucket.setBucketContent(writeBucketDTO.getBucketContent());
        bucket.setCategory(writeBucketDTO.getCategory());
        bucket.setPublicStatus(writeBucketDTO.getPublicStatus());
        bucket.setCreateDate(writeBucketDTO.getCreateDate());
        if (writeBucketDTO.getGoalDate() != null) {
            bucket.setGoalDate(writeBucketDTO.getGoalDate());
        }
        return bucket;
    }
}
