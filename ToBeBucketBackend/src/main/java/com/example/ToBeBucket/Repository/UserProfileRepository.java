package com.example.ToBeBucket.Repository;

import com.example.ToBeBucket.Entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile,String> {
    Optional<UserProfile> findByNickname(String nickname);
    Optional<UserProfile> findByUserId(String userId);
}
