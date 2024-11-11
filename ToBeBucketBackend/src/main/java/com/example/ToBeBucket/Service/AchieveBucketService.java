package com.example.ToBeBucket.Service;

import com.example.ToBeBucket.DTO.AchieveBucketDTO;
import com.example.ToBeBucket.Entity.BucketAchievement;
import com.example.ToBeBucket.Repository.AcheiveBucketRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AchieveBucketService {
    private final AcheiveBucketRepository achieveBucketRepository;

    public void saveAchieveBucket(AchieveBucketDTO achieveBucketDTO) {
        // DTO에서 Entity로 변환
        BucketAchievement achieveBucket = new BucketAchievement();

        achieveBucket.setBucketId(achieveBucketDTO.getBucketId());
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
}
