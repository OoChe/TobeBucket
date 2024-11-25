package com.example.ToBeBucket.Service;

import com.example.ToBeBucket.Entity.UserAlarm;
import com.example.ToBeBucket.Entity.UserFriend;
import com.example.ToBeBucket.Repository.ProcessFriendRepository;
import com.example.ToBeBucket.Repository.UserProfileRepository;
import com.example.ToBeBucket.Repository.AlarmRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProcessFriendService {
    private final ProcessFriendRepository processFriendRepository;
    private final UserProfileRepository userProfileRepository;
    private final AlarmRepository alarmRepository;

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

    private void createFriendRequestAlarm(String senderId, String receiverId) {
        UserAlarm alarm = new UserAlarm();
        alarm.setUserId(receiverId);
        alarm.setAlarmContent(senderId + "님이 친구 요청을 보냈습니다.");
        alarm.setReadStatus(false);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        alarm.setReceiveDate(LocalDate.now().format(formatter));
        alarmRepository.save(alarm);
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

            createFriendRequestAlarm(userId, friendId);
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

    public List<Map<String, Object>> addFriendStatusToUserList(String userId, List<Map<String, Object>> userList) {
        return userList.stream()
                .map(user -> {
                    String friendId = (String) user.get("userId");

                    // 현재 유저와 friendId의 관계 조회
                    Integer friendStatus = processFriendRepository.findFriendStatus(userId, friendId);
                    if (friendStatus == null) {
                        friendStatus = -1; // 관계가 없는 경우
                    }

                    // friendStatus 추가
                    user.put("friendStatus", friendStatus);
                    return user;
                })
                .collect(Collectors.toList());
    }
}
