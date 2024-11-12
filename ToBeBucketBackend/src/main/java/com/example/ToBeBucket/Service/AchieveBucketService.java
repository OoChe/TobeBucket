package com.example.ToBeBucket.Service;

import com.example.ToBeBucket.DTO.AchieveBucketDTO;
import com.example.ToBeBucket.DTO.SemiGoalDTO;
import com.example.ToBeBucket.Entity.Bucket;
import com.example.ToBeBucket.Entity.BucketAchievement;
import com.example.ToBeBucket.Entity.BucketSemiGoal;
import com.example.ToBeBucket.Entity.Sticker;
import com.example.ToBeBucket.Repository.AchieveBucketRepository;
import com.example.ToBeBucket.Repository.BucketRepository;
import com.example.ToBeBucket.Repository.BucketSemiGoalRepository;
import com.example.ToBeBucket.Repository.StickerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AchieveBucketService {
    private final AchieveBucketRepository achieveBucketRepository;
    private final BucketRepository bucketRepository;
    private final BucketSemiGoalRepository bucketSemiGoalRepository;
    private final StickerRepository stickerRepository;

    //달성기록 데이터베이스에 저장
    public void saveAchieveBucket(AchieveBucketDTO achieveBucketDTO) {
        Bucket bucket = bucketRepository.findById(achieveBucketDTO.getBucketId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid bucketId: " + achieveBucketDTO.getBucketId()));

        // Bucket에 연결된 BucketAchievement 찾기
        BucketAchievement achieveBucket = achieveBucketRepository.findByBucketId(achieveBucketDTO.getBucketId())
                .orElse(null);

        if (achieveBucket != null) {
            //이미 달성기록한 거 수정하는 경우 >> 근데 수정가능하게 할지 말지 고려필요
            achieveBucket.setStickerId(achieveBucketDTO.getStickerId());
            achieveBucket.setAchieveDate(achieveBucketDTO.getAchieveDate());
            achieveBucket.setGoalReview(achieveBucketDTO.getGoalReview());
            achieveBucket.setAchievementMedia(achieveBucketDTO.getAchievementMedia());
            achieveBucketRepository.save(achieveBucket);

            // Bucket 달성 상태 업데이트
            bucket.setAchieveStatus(true);
            bucketRepository.save(bucket);
        } else {
            //존재하지 않으면 새로 추가
            BucketAchievement newAchieveBucket = new BucketAchievement();
            newAchieveBucket.setBucket(bucket);
            newAchieveBucket.setStickerId(achieveBucketDTO.getStickerId());
            newAchieveBucket.setAchieveDate(achieveBucketDTO.getAchieveDate());
            newAchieveBucket.setGoalReview(achieveBucketDTO.getGoalReview());
            newAchieveBucket.setAchievementMedia(achieveBucketDTO.getAchievementMedia());
            achieveBucketRepository.save(newAchieveBucket);

            bucket.setAchieveStatus(true);
            bucketRepository.save(bucket);
        }
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
