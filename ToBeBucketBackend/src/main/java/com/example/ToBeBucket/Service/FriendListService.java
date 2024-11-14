package com.example.ToBeBucket.Service;

import com.example.ToBeBucket.Entity.UserFriend;
import com.example.ToBeBucket.Repository.FriendListRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FriendListService {
    private final FriendListRepository friendListRepository;
    public List<UserFriend> getFriendList(String userId) {
        return friendListRepository.findByUserId(userId);
    }

}
