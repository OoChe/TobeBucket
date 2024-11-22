package com.example.ToBeBucket.Repository;

import com.example.ToBeBucket.Entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Map;
import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile,String> {
    Optional<UserProfile> findByNickname(String nickname);
    Optional<UserProfile> findByUserId(String userId);

    @Query("SELECT new map(up.userId as userId, up.nickname as nickname, up.mbti as mbti, up.profileImage as profileImage) " +
            "FROM UserProfile up WHERE up.userId = :userId")
    Map<String, Object> findProfileByUserId(@Param("userId") String userId);

    @Query("SELECT new map(up.userId as userId, up.mbti as mbti, up.intro as intro, up.profileImage as profileImage) " +
            "FROM UserProfile up WHERE up.userId = :userId")
    Map<String, Object> findProfileWithIntroByUserId(@Param("userId") String userId);
}
