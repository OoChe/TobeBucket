package com.example.ToBeBucket.Repository;

import com.example.ToBeBucket.Entity.UserFriend;
import com.example.ToBeBucket.Entity.UserLogin;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProcessFriendRepository extends JpaRepository<UserFriend, Long> {
     UserFriend findByUserIdAndFriendId(String userId, String friendId);

     @Modifying
     @Transactional
     @Query("DELETE FROM UserFriend uf WHERE uf.userId = :userId AND uf.friendId = :friendId")
     void deleteByUserIdAndFriendId(@Param("userId") String userId, @Param("friendId") String friendId);


     @Query("SELECT uf.userId FROM UserFriend uf WHERE uf.friendId = :userId AND uf.friendStatus = 0")
     List<String> findPendingRequests(@Param("userId") String userId);

     @Query("SELECT uf.friendId FROM UserFriend uf WHERE uf.userId = :userId AND uf.friendStatus = 1")
     List<String> findConfirmedFriends(@Param("userId") String userId);
}

