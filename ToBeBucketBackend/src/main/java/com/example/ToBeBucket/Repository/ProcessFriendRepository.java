package com.example.ToBeBucket.Repository;

import com.example.ToBeBucket.Entity.UserFriend;
import com.example.ToBeBucket.Entity.UserLogin;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProcessFriendRepository extends JpaRepository<UserFriend, Long> {
     UserFriend findByUserIdAndFriendId(String userId, String friendId);
}

