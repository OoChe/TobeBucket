package com.example.ToBeBucket.Service;

import com.example.ToBeBucket.DTO.GetBucketDTO;
import com.example.ToBeBucket.Entity.Bucket;
import com.example.ToBeBucket.Entity.BucketSemiGoal;
import com.example.ToBeBucket.Entity.UserBucket;
import com.example.ToBeBucket.Entity.UserLogin;
import com.example.ToBeBucket.Repository.AchieveBucketRepository;
import com.example.ToBeBucket.Repository.BucketRepository;
import com.example.ToBeBucket.Repository.BucketSemiGoalRepository;
import com.example.ToBeBucket.Repository.UserLoginRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;


@Slf4j
@Service
@RequiredArgsConstructor
public class GetTemplateListsService {
    private final BucketRepository bucketRepository;
    private final BucketSemiGoalRepository bucketSemiGoalRepository;
    public List<Map<String, Object>> getTemplates() {
        List<Map<String, Object>> templateLists = new ArrayList<>();

        List<Bucket> templateBuckets = bucketRepository.findAllByUserId("admin");

        for (Bucket templateBucket : templateBuckets) {
            Map<String, Object> templateMap = new LinkedHashMap<>();
            templateMap.put("bucketName", templateBucket.getBucketName());
            templateMap.put("bucketContent", templateBucket.getBucketContent());
            templateMap.put("category", templateBucket.getCategory());
            //중간목표
            List<Map<String, String>> semiGoalData = new ArrayList<>();
            List<BucketSemiGoal> bucketSemiGoals = bucketSemiGoalRepository.findByBucket(templateBucket);

            for (BucketSemiGoal oneSemiGoal : bucketSemiGoals) {
                Map<String, String> semiGoal = new LinkedHashMap<>();
                semiGoal.put("semiGoalTitle", oneSemiGoal.getSemiGoalTitle());
                semiGoalData.add(semiGoal);
            }
            templateMap.put("semiGoalData", semiGoalData); // 중간 목표 리스트 추가
            templateLists.add(templateMap);
        }
        return templateLists;
    }
}
