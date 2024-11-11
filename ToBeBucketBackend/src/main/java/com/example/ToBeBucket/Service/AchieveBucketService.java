package com.example.ToBeBucket.Service;

import com.example.ToBeBucket.DTO.AchieveBucketDTO;
import com.example.ToBeBucket.DTO.SemiGoalDTO;
import com.example.ToBeBucket.Entity.Bucket;
import com.example.ToBeBucket.Entity.BucketAchievement;
import com.example.ToBeBucket.Entity.BucketSemiGoal;
import com.example.ToBeBucket.Entity.Sticker;
import com.example.ToBeBucket.Repository.AcheiveBucketRepository;
import com.example.ToBeBucket.Repository.BucketRepository;
import com.example.ToBeBucket.Repository.BucketSemiGoalRepository;
import com.example.ToBeBucket.Repository.StickerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AchieveBucketService {
    private final AcheiveBucketRepository achieveBucketRepository;
    private final BucketRepository bucketRepository;
    private final BucketSemiGoalRepository bucketSemiGoalRepository;
    private final StickerRepository stickerRepository;

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

    public void saveSemiGoalAchievement(SemiGoalDTO semiGoalDTO){
        BucketSemiGoal bucketSemiGoal = bucketSemiGoalRepository.findById(semiGoalDTO.getSemiGoalId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid semiGoalId: " + semiGoalDTO.getSemiGoalId()));

        Sticker sticker = stickerRepository.findById(semiGoalDTO.getStickerId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid stickerId: " + semiGoalDTO.getStickerId()));

        // Sticker, AchieveDate 추가하기
        bucketSemiGoal.setSticker(sticker);
        bucketSemiGoal.setAchieveDate(semiGoalDTO.getAchieveDate());
        bucketSemiGoalRepository.save(bucketSemiGoal);
    }

}
