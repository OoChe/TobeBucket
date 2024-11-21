package com.example.ToBeBucket.Service;

import com.example.ToBeBucket.Entity.*;
import com.example.ToBeBucket.Repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class GetBucketDetailsService {
    private final UserBucketRepository userBucketRepository;
    private final BucketRepository bucketRepository;
    private final BucketSemiGoalRepository bucketSemiGoalRepository;
    private final AchieveBucketRepository achieveBucketRepository;
    private final UserLoginRepository userLoginRepository;

    public Map<String, Object> getBucketDetail(String userId, Integer bucketId){
        Bucket bucket = bucketRepository.findByBucketId(bucketId);
        UserLogin user = userLoginRepository.findByUserId(userId);
        List<UserBucket> userBuckets = userBucketRepository.findByUserIdAndBucketId(user, bucket);
        if (userBuckets.isEmpty()) {
            throw new RuntimeException("UserBucket not found for userId: " + userId + " and bucketId: " + bucketId);
        }
        UserBucket userBucket = userBuckets.get(0);
        List<BucketSemiGoal> bucketSemiGoals = bucketSemiGoalRepository.findByBucket(userBucket.getBucketId());
        Optional<BucketAchievement> bucketAchievement = achieveBucketRepository.findByBucketId(bucketId);

        Map<String, Object> bucketDetailMap = new LinkedHashMap<>();

        bucketDetailMap.put("bucketId", bucket.getBucketId());
        bucketDetailMap.put("bucketName", bucket.getBucketName());
        bucketDetailMap.put("bucketContent", bucket.getBucketContent());
        bucketDetailMap.put("createDate", bucket.getCreateDate());
        bucketDetailMap.put("goalDate", bucket.getGoalDate());
        bucketDetailMap.put("category", bucket.getCategory());
        //중간목표가 있는 버킷이라면 중간목표도 반환해야함
        if (!bucketSemiGoals.isEmpty()) {
            List<Map<String, Object>> semiGoalDataList = new ArrayList<>();

            for (BucketSemiGoal semiGoal : bucketSemiGoals) {
                Map<String, Object> semiGoalMap = new LinkedHashMap<>();
                semiGoalMap.put("semiGoalTitle", semiGoal.getSemiGoalTitle());
                if (semiGoal.getSticker() != null) {
                    semiGoalMap.put("stickerId", semiGoal.getSticker().getStickerId());
                }
                semiGoalDataList.add(semiGoalMap);
            }
            bucketDetailMap.put("semiGoalData", semiGoalDataList);
        }

        //달성한 버킷에 대한 조회라면 달성 후 정보도 반환해야함
        if (bucketAchievement.isPresent()){
            bucketDetailMap.put("achievementDate", bucketAchievement.get().getAchieveDate());
            bucketDetailMap.put("stickerId", bucketAchievement.get().getStickerId());
            if (bucketAchievement.get().getGoalReview() != null){
                bucketDetailMap.put("goalReview", bucketAchievement.get().getGoalReview());
            }
            if (bucketAchievement.get().getAchievementMedia() != null) {
                bucketDetailMap.put("achievementMedia", bucketAchievement.get().getAchievementMedia());
            }
        }

        return bucketDetailMap;
    }
}
