package com.example.ToBeBucket.Service;

import com.example.ToBeBucket.DTO.GetBucketDTO;
import com.example.ToBeBucket.Entity.*;
import com.example.ToBeBucket.Repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class GetBucketlistsService {
    private final GetNotAchvBucketlistsRepository getNotAchvBucketlistsRepository;
    private final AchieveBucketRepository acheiveBucketRepository;
    private final UserBucketRepository userBucketRepository;
    private final UserLoginRepository userLoginRepository;
    private final BucketSemiGoalRepository bucketSemiGoalRepository;
    private final BucketFriendRepository bucketFriendRepository;
    private final UserProfileRepository userProfileRepository;
    public List<Map<String, Object>> getBucketlists(String userId, Boolean achieveStatus) {

        // UserBucket을 이용하여 UserId와 BucketId에 해당하는 버킷 정보를 가져오기
        UserLogin userLogin = userLoginRepository.findByUserId(userId);
        List<UserBucket> userBuckets = userBucketRepository.findByUserId(userLogin);

        if (Boolean.FALSE.equals(achieveStatus)) { // 미달성 버킷 조회
            return userBuckets.stream()
                    .map(userBucket -> {
                        Bucket bucket = userBucket.getBucketId();  // UserBucket을 통해 Bucket 정보 조회
                        if (!bucket.getAchieveStatus()) { // 미달성 버킷만 조회
                            Map<String, Object> map = new LinkedHashMap<>();
                            map.put("bucketId", bucket.getBucketId());
                            map.put("bucketName", bucket.getBucketName());
                            map.put("bucketContent", bucket.getBucketContent());
                            map.put("goalDate", bucket.getGoalDate());
                            map.put("category", bucket.getCategory());
                            map.put("publicStatus", bucket.getPublicStatus());

                            // 중간목표가 있는 경우 추가
                            List<BucketSemiGoal> bucketSemiGoals = bucketSemiGoalRepository.findByBucket(bucket);
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
                                map.put("semiGoalData", semiGoalDataList);
                            }

                            // 함께하는 친구가 있는 경우 친구 정보도 추가
                            List<BucketFriend> bucketFriendLists = bucketFriendRepository.findByBucket(bucket);
                            if (!bucketFriendLists.isEmpty()) {
                                List<String> friendNicknameLists = new ArrayList<>();
                                for (BucketFriend bucketFriend : bucketFriendLists) {
                                    Optional<UserProfile> userProfileOpt = userProfileRepository.findByUserId(bucketFriend.getFriend().getUserId());
                                    userProfileOpt.ifPresent(userProfile -> {
                                        friendNicknameLists.add(userProfile.getNickname());
                                    });
                                }
                                map.put("friendNickname", friendNicknameLists);
                            }
                            return map;
                        }
                        return null;
                    })
                    .filter(bucket -> bucket != null) // null 제외
                    .collect(Collectors.toList());
        } else { // 달성한 버킷 조회
            return userBuckets.stream()
                    .map(userBucket -> {
                        Bucket bucket = userBucket.getBucketId(); // UserBucket을 통해 Bucket 정보 조회
                        if (bucket == null) {
                            return null; // Bucket이 없으면 null 반환
                        }

                        // Bucket에 해당하는 모든 BucketAchievement 조회
                        List<BucketAchievement> bucketAchievements = acheiveBucketRepository.findByBucket(bucket); // 수정 부분
                        if (bucketAchievements.isEmpty()) {
                            return null; // BucketAchievement가 없으면 null 반환
                        }

                        // 여러 개의 BucketAchievement가 있을 경우, 각 항목을 처리
                        return bucketAchievements.stream()
                                .map(bucketAchievement -> {
                                    Map<String, Object> map = new LinkedHashMap<>();
                                    map.put("bucketId", bucketAchievement.getBucketId());
                                    map.put("bucketName", bucket.getBucketName());
                                    map.put("achieveDate", bucketAchievement.getAchieveDate());
                                    map.put("category", bucket.getCategory());
                                    map.put("achievementMedia", bucketAchievement.getAchievementMedia());
                                    map.put("goalReview", bucketAchievement.getGoalReview());
                                    map.put("stickerId", bucketAchievement.getStickerId());
                                    return map;
                                })
                                .collect(Collectors.toList());
                    })
                    .filter(bucket -> bucket != null) // null 제외
                    .flatMap(List::stream) // 여러 개의 결과를 하나의 리스트로 평탄화
                    .collect(Collectors.toList());
        }
    }

}
