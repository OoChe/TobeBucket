package com.example.ToBeBucket.Service;

import com.example.ToBeBucket.Entity.UserFriend;
import com.example.ToBeBucket.Repository.ProcessFriendRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProcessFriendService {
    private final ProcessFriendRepository processFriendRepository;

    @Transactional
    public void deleteFriendByUserId(String userId, String friendId) {
        try {
            // 친구 삭제 (양방향 관계 삭제)
            UserFriend userFriend1 = processFriendRepository.findByUserIdAndFriendId(userId, friendId);
            if (userFriend1 != null) {
                processFriendRepository.delete(userFriend1);
            }
            UserFriend userFriend2 = processFriendRepository.findByUserIdAndFriendId(friendId, userId);
            if (userFriend1 != null) {
                processFriendRepository.delete(userFriend2);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete friend relationship.");
        }
    }
}
