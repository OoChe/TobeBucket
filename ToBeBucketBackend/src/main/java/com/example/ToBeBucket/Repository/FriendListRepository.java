package com.example.ToBeBucket.Repository;

import com.example.ToBeBucket.Entity.UserFriend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FriendListRepository extends JpaRepository<UserFriend, Long> {
    List<UserFriend> findByUserIdAndFriendStatus(String userId, Integer friendStatus);
    @Query("SELECT f.friendId FROM UserFriend f WHERE f.userId = :userId AND f.friendStatus = 1")
    List<String> findFriendIdsByUserId(@Param("userId") String userId);
}
