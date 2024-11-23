package com.example.ToBeBucket.Repository;

import com.example.ToBeBucket.Entity.UserFriend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserFriendRepository extends JpaRepository<UserFriend,Integer> {
    //삭젴
}
