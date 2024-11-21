package com.example.ToBeBucket.Service;

import com.example.ToBeBucket.DTO.GetBucketDTO;
import com.example.ToBeBucket.Entity.BucketAchievement;
import com.example.ToBeBucket.Entity.UserBucket;
import com.example.ToBeBucket.Entity.UserLogin;
import com.example.ToBeBucket.Entity.Bucket;
import com.example.ToBeBucket.Repository.UserBucketRepository;
import com.example.ToBeBucket.Repository.AchieveBucketRepository;
import com.example.ToBeBucket.Repository.GetNotAchvBucketlistsRepository;
import com.example.ToBeBucket.Repository.UserLoginRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class GetBucketlistsService {
    private final GetNotAchvBucketlistsRepository getNotAchvBucketlistsRepository;
    private final AchieveBucketRepository acheiveBucketRepository;
    private final UserBucketRepository userBucketRepository;
    private final UserLoginRepository userLoginRepository;

    public List<Map<String, Object>> getBucketlists(GetBucketDTO getBucketDTO) {

        // UserBucket을 이용하여 UserId와 BucketId에 해당하는 버킷 정보를 가져오기
        UserLogin userLogin = userLoginRepository.findByUserId(getBucketDTO.getUserId());
        List<UserBucket> userBuckets = userBucketRepository.findByUserId(userLogin);

        if (Boolean.FALSE.equals(getBucketDTO.getAchieveStatus())) { // 미달성 버킷 조회
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
