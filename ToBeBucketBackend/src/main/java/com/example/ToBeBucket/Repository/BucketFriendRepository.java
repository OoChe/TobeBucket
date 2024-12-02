package com.example.ToBeBucket.Repository;

import com.example.ToBeBucket.Entity.Bucket;
import com.example.ToBeBucket.Entity.BucketFriend;
import com.example.ToBeBucket.Entity.UserLogin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BucketFriendRepository extends JpaRepository<BucketFriend,Integer> {
    List<BucketFriend> findByBucket(Bucket bucket);
    boolean existsByUserLoginAndFriendAndBucket(UserLogin userLogin, UserLogin friend, Bucket bucket);

}
