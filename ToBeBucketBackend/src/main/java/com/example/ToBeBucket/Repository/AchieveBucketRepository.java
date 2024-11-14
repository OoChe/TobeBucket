package com.example.ToBeBucket.Repository;

import com.example.ToBeBucket.Entity.BucketAchievement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AchieveBucketRepository extends JpaRepository<BucketAchievement, Integer> {
    Optional<BucketAchievement> findByBucketId(Integer bucketId);
    List<BucketAchievement> findAllByBucket_UserId(String userId);
}

