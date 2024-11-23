package com.example.ToBeBucket.Service;

import com.example.ToBeBucket.Entity.UserFriend;
import com.example.ToBeBucket.Repository.ProcessFriendRepository;
import com.example.ToBeBucket.Repository.UserProfileRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProcessFriendService {
    private final ProcessFriendRepository processFriendRepository;
    private final UserProfileRepository userProfileRepository;

    @Transactional
    public void deleteFriendByUserId(String userId, String friendId) {
        try {
            processFriendRepository.deleteByUserIdAndFriendId(userId, friendId);
            processFriendRepository.deleteByUserIdAndFriendId(friendId, userId);
        } catch (Exception e) {
            log.error("Failed to delete friend relationship: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to delete friend relationship.", e);
        }
    }

    @Transactional
    public void addFriend(String userId, String friendId) {
        try {
            // 새로운 UserFriend 엔티티 생성
            UserFriend newFriend = new UserFriend();
            newFriend.setUserId(userId);
            newFriend.setFriendId(friendId);
            newFriend.setFriendStatus(0);

            processFriendRepository.save(newFriend);

        } catch (Exception e) {
            throw new RuntimeException("Failed to add friend.");
        }
    }

    @Transactional
    public void acceptFriendRequest(String friendId, String userId) {
        try {
            // 1. 기존 요청 상태 업데이트 (b -> a)
            UserFriend friendRequest = processFriendRepository.findByUserIdAndFriendId(friendId, userId);
            if (friendRequest == null) {
                throw new RuntimeException("Friend request not found.");
            }
            friendRequest.setFriendStatus(1); // 요청 수락
            processFriendRepository.save(friendRequest);

            // 2. 양방향 관계 추가 (a -> b)
            UserFriend reverseRelation = processFriendRepository.findByUserIdAndFriendId(userId, friendId);
            if (reverseRelation == null) {
                UserFriend newFriendRelation = new UserFriend();
                newFriendRelation.setUserId(userId);
                newFriendRelation.setFriendId(friendId);
                newFriendRelation.setFriendStatus(1);
                processFriendRepository.save(newFriendRelation);
            }
        } catch (Exception e) {
            log.error("Error accepting friend request: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to accept friend request.", e);
        }
    }

    @Transactional
    public void rejectFriendRequest(String friendId, String userId) {
        try {
            // 기존 요청의 friendStatus를 2로 업데이트
            UserFriend friendRequest = processFriendRepository.findByUserIdAndFriendId(friendId, userId);
            if (friendRequest == null) {
                throw new RuntimeException("Friend request not found.");
            }
            friendRequest.setFriendStatus(2); // 친구 요청 거절
            processFriendRepository.save(friendRequest);
        } catch (Exception e) {
            throw new RuntimeException("Failed to reject friend request.", e);
        }
    }

    public List<Map<String, Object>> getFriendRequests(String userId) {
        List<String> requesterIds = processFriendRepository.findPendingRequests(userId);

        return requesterIds.stream()
                .map(requesterId -> userProfileRepository.findProfileByUserId(requesterId))
                .collect(Collectors.toList());
    }

    public List<Map<String, Object>> getFriends(String userId) {
        List<String> friendIds = processFriendRepository.findConfirmedFriends(userId);

        return friendIds.stream()
                .map(friendId -> userProfileRepository.findProfileByUserId(friendId))
                .collect(Collectors.toList());
    }
}
