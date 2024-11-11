package com.example.ToBeBucket.Service;

import com.example.ToBeBucket.DTO.AchieveBucketDTO;
import com.example.ToBeBucket.DTO.SemiGoalDTO;
import com.example.ToBeBucket.Entity.Bucket;
import com.example.ToBeBucket.Entity.BucketAchievement;
import com.example.ToBeBucket.Repository.AcheiveBucketRepository;
import com.example.ToBeBucket.Repository.BucketRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AchieveBucketService {
    private final AcheiveBucketRepository achieveBucketRepository;
    private final BucketRepository bucketRepository;

    public void saveAchieveBucket(AchieveBucketDTO achieveBucketDTO) {
        // DTO에서 Entity로 변환
        Bucket bucket = bucketRepository.findById(achieveBucketDTO.getBucketId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid bucketId: " + achieveBucketDTO.getBucketId()));

        BucketAchievement achieveBucket = new BucketAchievement();

        achieveBucket.setBucket(bucket);
        achieveBucket.setStickerId(achieveBucketDTO.getStickerId());

        // Optional 값 처리
        if (achieveBucketDTO.getAchieveDate() != null) {
            achieveBucket.setAchieveDate(achieveBucketDTO.getAchieveDate());
        }
        if (achieveBucketDTO.getGoalReview() != null) {
            achieveBucket.setGoalReview(achieveBucketDTO.getGoalReview());
        }
        if (achieveBucketDTO.getAchievementMedia() != null) {
            achieveBucket.setAchievementMedia(achieveBucketDTO.getAchievementMedia());
        }

        // Repository를 이용하여 DB에 저장
        achieveBucketRepository.save(achieveBucket);
    }

    public void saveSemiGoalAhcivement(SemiGoalDTO semiGoalDTO){

    }

}
