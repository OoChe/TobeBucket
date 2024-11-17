package com.example.ToBeBucket.Repository;

import com.example.ToBeBucket.Entity.Bucket;
import com.example.ToBeBucket.Entity.UserBucket;
import com.example.ToBeBucket.Entity.UserLogin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserBucketRepository extends JpaRepository<UserBucket,Integer> {
    List<UserBucket> findByUserIdAndBucketId(UserLogin user, Bucket bucket);
    List<UserBucket> findByUserId(UserLogin user);

}
