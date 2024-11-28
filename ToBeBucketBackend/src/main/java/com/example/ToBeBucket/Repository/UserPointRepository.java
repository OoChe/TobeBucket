package com.example.ToBeBucket.Repository;

import com.example.ToBeBucket.Entity.UserPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserPointRepository extends JpaRepository<UserPoint, String> {
    @Query("SELECT p.point FROM UserPoint p WHERE p.userId = :userId")
    Integer findPointByUserId(@Param("userId") String userId);

}
