package com.example.ToBeBucket.Repository;
import com.example.ToBeBucket.Entity.Bucket;
import com.example.ToBeBucket.Entity.UserLogin;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

import java.util.List;

public interface BucketRepository extends JpaRepository<Bucket, Integer> {
    Bucket findByBucketId(int bucketId);
    List<Bucket> findAllByUserId(String userId);
    List<Bucket> findAllByMbtiAndPublicStatus(String mbti, Boolean publicStatus);

    @Query("SELECT new map(b.bucketId as bucketId, b.bucketName as bucketName, b.bucketContent as bucketContent, " +
            "b.achieveStatus as achieveStatus) " +
            "FROM Bucket b WHERE b.userId = :userId AND b.publicStatus = true")
    List<Map<String, Object>> findPublicBucketsByUserId(@Param("userId") String userId);

    @Modifying
    @Transactional
    @Query("UPDATE Bucket b SET b.mbti = :newMbti WHERE b.userId = :userId AND b.mbti = :oldMbti")
    void updateMbtiForUser(@Param("userId") String userId, @Param("oldMbti") String oldMbti, @Param("newMbti") String newMbti);

    @Query("SELECT b.bucketId as bucketId, b.userId as userId, b.bucketName as bucketName, b.bucketContent as bucketContent, " +
            "b.achieveStatus as achieveStatus, a.achieveDate as achieveDate " +
            "FROM Bucket b LEFT JOIN BucketAchievement a ON b.bucketId = a.bucketId " +
            "WHERE b.userId IN :userIds AND b.publicStatus = true")
    List<Map<String, Object>> findBucketsByUserIds(@Param("userIds") List<String> userIds);


    @Query("SELECT new map(b.bucketId as bucketId, b.category as category, b.achieveStatus as achieveStatus) " +
            "FROM Bucket b WHERE b.userId = :userId")
    List<Map<String, Object>> findBucketsByUserId(@Param("userId") String userId);

    @Query("SELECT b.bucketId FROM Bucket b WHERE b.userId = :userId AND b.achieveStatus = true")
    List<Integer> findAchievedBucketIdsByUserId(@Param("userId") String userId);

    @Query("SELECT b.bucketId FROM Bucket b WHERE b.userId = :userId")
    Integer findBucketIdByUserId(String userId);

}
