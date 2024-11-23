package com.example.ToBeBucket.Service;

import com.example.ToBeBucket.Entity.UserFriend;
import com.example.ToBeBucket.Repository.UserFriendRepository;
import com.example.ToBeBucket.Repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserFriendService {
    private final UserFriendRepository userFriendRepository;
    private final UserProfileRepository userProfileRepository;
    //사용자의 친구 목록 반환하는 비즈니스 로직
    public List<String> getFriendLists (String userId){
        List<UserFriend> UserFriendLists = userFriendRepository.findByUserIdAndFriendStatus(userId,1);
        List<String> friendList = new ArrayList<>();

        for (UserFriend userFriend : UserFriendLists){
            if(userProfileRepository.findByUserId(userFriend.getFriendId()).isPresent()){
                String friendNickname=userProfileRepository.findByUserId(userFriend.getFriendId()).get().getNickname();
                friendList.add(friendNickname);
            }
        }
        return friendList;
    }

}
