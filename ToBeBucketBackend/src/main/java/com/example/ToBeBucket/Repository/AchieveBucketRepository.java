package com.example.ToBeBucket.Repository;

import com.example.ToBeBucket.Entity.Bucket;
import com.example.ToBeBucket.Entity.BucketAchievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface AchieveBucketRepository extends JpaRepository<BucketAchievement, Integer> {
    Optional<BucketAchievement> findByBucketId(Integer bucketId);
    List<BucketAchievement> findByBucket(Bucket bucket);
    List<BucketAchievement> findAllByBucketIn(List<Bucket> buckets);

    @Query("SELECT ba.achieveDate FROM BucketAchievement ba WHERE ba.bucketId = :bucketId")
    String findAchieveDateByBucketId(@Param("bucketId") Integer bucketId);

    @Query("SELECT new map(ba.bucketId as bucketId, ba.achieveDate as achieveDate) " +
            "FROM BucketAchievement ba WHERE (:bucketIds IS NULL OR ba.bucketId IN :bucketIds)")
    List<Map<String, Object>> findAchieveDatesByBucketIds(@Param("bucketIds") List<Integer> bucketIds);

    @Query("SELECT ba.achievementMedia FROM BucketAchievement ba WHERE ba.bucketId = :bucketId")
    String findAchievementMediaByBucketId(@Param("bucketId") Integer bucketId);

}

