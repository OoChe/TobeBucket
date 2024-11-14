package com.example.ToBeBucket.Repository;

import com.example.ToBeBucket.Entity.Bucket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BucketRepository extends JpaRepository<Bucket, Integer> {
}
