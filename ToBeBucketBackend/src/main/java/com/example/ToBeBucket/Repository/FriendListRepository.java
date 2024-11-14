package com.example.ToBeBucket.Repository;

import com.example.ToBeBucket.Entity.UserFriend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendListRepository extends JpaRepository<UserFriend, Long> {
    List<UserFriend> findByUserId(String userId);
}
