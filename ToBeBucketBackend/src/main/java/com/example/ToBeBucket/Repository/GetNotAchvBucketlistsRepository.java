package com.example.ToBeBucket.Repository;

import com.example.ToBeBucket.DTO.NotAchvBucketDTO;
import com.example.ToBeBucket.Entity.Bucket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface GetNotAchvBucketlistsRepository extends JpaRepository<Bucket, Integer> {
    List<Bucket> findAllByUserIdAndAchieveStatus(String userId, boolean achieveStatus);
}
