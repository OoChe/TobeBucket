package com.example.ToBeBucket.Repository;

import com.example.ToBeBucket.Entity.BucketAchievement;
import com.example.ToBeBucket.Entity.BucketSemiGoal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BucketSemiGoalRepository extends JpaRepository<BucketSemiGoal, Integer> {
}
