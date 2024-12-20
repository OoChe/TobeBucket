package com.example.ToBeBucket.Service;


import com.example.ToBeBucket.Entity.Bucket;
import com.example.ToBeBucket.Entity.BucketAchievement;
import com.example.ToBeBucket.Repository.AchieveBucketRepository;
import com.example.ToBeBucket.Repository.BucketRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class GetMbtiBucketListsService {
    private final BucketRepository bucketRepository;
    private final AchieveBucketRepository achieveBucketRepository;
    public List<Map<String, Object>> getMbtiBucketLists(String sMBTI) {
        List<Bucket> mbtiBucketLists = bucketRepository.findAllByMbtiAndPublicStatus(sMBTI, true);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        mbtiBucketLists.sort(Comparator.comparing(bucket -> LocalDate.parse(bucket.getCreateDate(), formatter), Comparator.reverseOrder()));

        List<BucketAchievement> bucketAchievements = achieveBucketRepository.findAllByBucketIn(mbtiBucketLists);
        Map<Bucket, BucketAchievement> achievementMap = new HashMap<>();
        for (BucketAchievement achievement : bucketAchievements) {
            achievementMap.put(achievement.getBucket(), achievement);
        }

        List<Map<String, Object>> mbtiMap = new ArrayList<>();
        for (Bucket bucket : mbtiBucketLists) {
            Map<String, Object> oMbti = new LinkedHashMap<>();
            oMbti.put("bucketName", bucket.getBucketName());
            oMbti.put("bucketContent", bucket.getBucketContent());
            if (achievementMap.containsKey(bucket)) {
                oMbti.put("achieveDate", achievementMap.get(bucket).getAchieveDate());
                oMbti.put("achievementMedia", achievementMap.get(bucket).getAchievementMedia());
            }
            mbtiMap.add(oMbti);
        }
        return mbtiMap;
    }

}

