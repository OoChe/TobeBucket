package com.example.ToBeBucket.Repository;

import com.example.ToBeBucket.Entity.Bucket;
import com.example.ToBeBucket.Entity.UserLogin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BucketRepository extends JpaRepository<Bucket, Integer> {
    Bucket findByBucketId(int bucketId);
    List<Bucket> findAllByUserId(String userId);
}
