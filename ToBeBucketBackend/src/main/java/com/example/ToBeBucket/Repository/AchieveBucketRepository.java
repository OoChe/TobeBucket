package com.example.ToBeBucket.Repository;

import com.example.ToBeBucket.Entity.BucketAchievement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AchieveBucketRepository extends JpaRepository<BucketAchievement, Integer> {
    List<BucketAchievement> findAllByBucket_UserId(String userId);
}
