package com.example.ToBeBucket.Service;

import com.example.ToBeBucket.DTO.GetBucketDTO;
import com.example.ToBeBucket.Entity.Bucket;
import com.example.ToBeBucket.Entity.BucketAchievement;
import com.example.ToBeBucket.Repository.AcheiveBucketRepository;
import com.example.ToBeBucket.Repository.GetNotAchvBucketlistsRepository;
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
    private final AcheiveBucketRepository acheiveBucketRepository;
    public List<Map<String, Object>> getBucketlists(GetBucketDTO getBucketDTO) {
        if (Boolean.FALSE.equals(getBucketDTO.getAchieveStatus())) { // 미달성 버킷 조회
            return getNotAchvBucketlistsRepository.findAllByUserIdAndAchieveStatus(getBucketDTO.getUserId(), false)
                    .stream()
                    .map(bucket -> {
                        Map<String, Object> map = new LinkedHashMap<>();
                        map.put("bucketId", bucket.getBucketId());
                        map.put("bucketName", bucket.getBucketName());
                        map.put("bucketContent", bucket.getBucketContent());
                        map.put("goalDate", bucket.getGoalDate());
                        map.put("category", bucket.getCategory());
                        return map;
                    })
                    .collect(Collectors.toList());
        } else { // 달성한 버킷 조회
            return acheiveBucketRepository.findAllByUserId(getBucketDTO.getUserId())
                    .stream()
                    .map(bucketAchievement -> {
                        Map<String, Object> map = new LinkedHashMap<>();
                        map.put("bucketId", bucketAchievement.getBucketId());
                        map.put("bucketName", bucketAchievement.getBucket().getBucketName());
                        map.put("achieveDate", bucketAchievement.getAchieveDate());
                        map.put("category", bucketAchievement.getBucket().getCategory());
                        map.put("achievementMedia", bucketAchievement.getAchievementMedia());
                        map.put("goalReview", bucketAchievement.getGoalReview());
                        return map;
                    })
                    .collect(Collectors.toList());
        }
    }
}
