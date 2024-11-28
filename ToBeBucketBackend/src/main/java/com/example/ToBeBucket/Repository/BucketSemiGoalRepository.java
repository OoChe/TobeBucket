package com.example.ToBeBucket.Repository;

import com.example.ToBeBucket.Entity.Bucket;
import com.example.ToBeBucket.Entity.BucketSemiGoal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BucketSemiGoalRepository extends JpaRepository<BucketSemiGoal, Integer> {
    List<BucketSemiGoal> findByBucket(Bucket bucket);
}
