package com.example.ToBeBucket.Repository;

import com.example.ToBeBucket.Entity.Bucket;
import com.example.ToBeBucket.Entity.BucketAchievement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface AcheiveBucketRepository extends JpaRepository<BucketAchievement, Integer> {
    List<BucketAchievement> findAllByUserId(String userId);
}
