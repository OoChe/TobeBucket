package com.example.ToBeBucket.Repository;

import com.example.ToBeBucket.Entity.Bucket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface BucketRepository extends JpaRepository<Bucket, Integer> {
    Bucket findByBucketId(int bucketId);

    @Query("SELECT new map(b.bucketId as bucketId, b.bucketName as bucketName, b.bucketContent as bucketContent, " +
            "b.achieveStatus as achieveStatus) " +
            "FROM Bucket b WHERE b.userId = :userId AND b.publicStatus = true")
    List<Map<String, Object>> findPublicBucketsByUserId(@Param("userId") String userId);

}
