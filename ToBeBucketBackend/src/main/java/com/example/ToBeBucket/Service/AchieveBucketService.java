package com.example.ToBeBucket.Service;

import com.example.ToBeBucket.DTO.AchieveBucketDTO;
import com.example.ToBeBucket.DTO.SemiGoalDTO;
import com.example.ToBeBucket.Entity.*;
import com.example.ToBeBucket.Repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class AchieveBucketService {
    private final AchieveBucketRepository achieveBucketRepository;
    private final BucketRepository bucketRepository;
    private final BucketSemiGoalRepository bucketSemiGoalRepository;
    private final StickerRepository stickerRepository;
    private final UserProfileRepository userProfileRepository;
    private final UserPointRepository userPointRepository;

    //달성기록 데이터베이스에 저장
    public void saveAchieveBucket(String userId, AchieveBucketDTO achieveBucketDTO) {
        Bucket bucket = bucketRepository.findById(achieveBucketDTO.getBucketId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid bucketId: " + achieveBucketDTO.getBucketId()));
        Optional<UserProfile> userProfile = userProfileRepository.findById(userId);

        // Bucket에 연결된 BucketAchievement 찾기
        BucketAchievement achieveBucket = achieveBucketRepository.findByBucketId(achieveBucketDTO.getBucketId())
                .orElse(null);

        if (achieveBucket != null) {
            //이미 달성기록한 거 수정하는 경우
            achieveBucket.setStickerId(achieveBucketDTO.getStickerId());
            //achieveBucket.setAchieveDate(achieveBucketDTO.getAchieveDate()); 날짜는 수정 불가능
            System.out.println("날짜는 수정 불가능합니다.");
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
            //포인트 점수 추가
            userProfile.ifPresent(profile -> {
                int newPoints = profile.getUserPoint() + 10;
                profile.setUserPoint(newPoints);
                userProfileRepository.save(profile);

                // userPoint 테이블도 업데이트
                Optional<UserPoint> userPoint = userPointRepository.findById(userId);
                userPoint.ifPresent(point -> {
                    point.setPoint(newPoints);
                    userPointRepository.save(point);
                });
            });

            bucket.setAchieveStatus(true);
            bucketRepository.save(bucket);
        }
    }

    public void saveSemiGoalAchievement(String userId, SemiGoalDTO semiGoalDTO){
        Integer semiGoalIndex = semiGoalDTO.getSemiGoalId();
        Bucket bucket = bucketRepository.findById(semiGoalDTO.getBucketId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid bucketId: " + semiGoalDTO.getBucketId()));
        List<BucketSemiGoal> bucketSemiGoals = bucketSemiGoalRepository.findByBucket(bucket);

        if (semiGoalIndex < 0 || semiGoalIndex >= bucketSemiGoals.size()) {
            throw new IllegalArgumentException("Invalid semiGoalIndex: " + semiGoalIndex);
        }

        BucketSemiGoal bucketSemiGoal = bucketSemiGoals.get(semiGoalIndex);  // 인덱스에 맞는 BucketSemiGoal 객체를 가져옴

        // 이미 달성한 목표는 포인트 증가 X
        if (bucketSemiGoal.getAchieveDate() == null) {
            Optional<UserProfile> userProfile = userProfileRepository.findById(userId);
            userProfile.ifPresent(profile -> {
                int newPoints = profile.getUserPoint() + 5;

                // UserProfile의 포인트 업데이트
                profile.setUserPoint(newPoints);
                userProfileRepository.save(profile);

                // UserPoint 테이블도 업데이트
                Optional<UserPoint> userPoint = userPointRepository.findById(userId);
                userPoint.ifPresent(point -> {
                    point.setPoint(newPoints);
                    userPointRepository.save(point); 
                });
            });
        }


        Sticker sticker = stickerRepository.findById(semiGoalDTO.getStickerId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid stickerId: " + semiGoalDTO.getStickerId()));

        // Sticker, AchieveDate 추가하기
        bucketSemiGoal.setSticker(sticker);
        bucketSemiGoal.setAchieveDate(semiGoalDTO.getAchieveDate());

        bucketSemiGoalRepository.save(bucketSemiGoal);
    }

}
