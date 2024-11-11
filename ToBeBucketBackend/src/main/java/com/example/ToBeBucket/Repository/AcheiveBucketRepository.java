package com.example.ToBeBucket.Repository;

import com.example.ToBeBucket.Entity.BucketAchievement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AcheiveBucketRepository extends JpaRepository<BucketAchievement, Integer> {
}
