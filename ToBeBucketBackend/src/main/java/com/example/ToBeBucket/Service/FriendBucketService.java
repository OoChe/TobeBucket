package com.example.ToBeBucket.Service;

import com.example.ToBeBucket.Repository.AchieveBucketRepository;
import com.example.ToBeBucket.Repository.BucketRepository;
import com.example.ToBeBucket.Repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class FriendBucketService {

    private final UserProfileRepository userProfileRepository;
    private final BucketRepository bucketRepository;
    private final AchieveBucketRepository achieveBucketRepository;

    /**
     * 프로필 정보 조회
     */
    public Map<String, Object> getUserProfile(String userId) {
        return userProfileRepository.findProfileWithIntroByUserId(userId);
    }

    /**
     * 버킷 리스트 조회
     */
    public List<Map<String, Object>> getBucketList(String userId) {
        return bucketRepository.findPublicBucketsByUserId(userId)
                .stream()
                .map(bucket -> {
                    Map<String, Object> bucketMap = new LinkedHashMap<>();
                    bucketMap.put("bucketName", bucket.get("bucketName"));
                    bucketMap.put("bucketContent", bucket.get("bucketContent"));

                    Integer bucketId = (Integer) bucket.get("bucketId");
                    Boolean achieveStatus = (Boolean) bucket.get("achieveStatus");

                    if (Boolean.TRUE.equals(achieveStatus)) {
                        String achieveDate = achieveBucketRepository.findAchieveDateByBucketId(bucketId);
                        String achievementMedia = achieveBucketRepository.findAchievementMediaByBucketId(bucketId);
                        bucketMap.put("achieveDate",achieveDate);
                        bucketMap.put("achievementMedia", achievementMedia);
                    }
                    return bucketMap;
                })
                .collect(Collectors.toList());
    }
}
