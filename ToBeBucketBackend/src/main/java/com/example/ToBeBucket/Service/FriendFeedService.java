package com.example.ToBeBucket.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.example.ToBeBucket.Entity.UserProfile;
import com.example.ToBeBucket.Repository.BucketRepository;
import com.example.ToBeBucket.Repository.FriendListRepository;
import com.example.ToBeBucket.Repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class FriendFeedService {
    private final FriendListRepository friendListRepository;
    private final UserProfileRepository userProfileRepository;
    private final BucketRepository bucketRepository;

    public List<Map<String, Object>> getFriendBuckets(String userId) {
        // 1. 친구 리스트 가져오기 (friendId)
        List<String> friendIds = friendListRepository.findFriendIdsByUserId(userId);

        // 2. 친구들의 정보 가져오기
        List<Map<String, Object>> friendProfiles = userProfileRepository.findProfilesByIds(friendIds);
        Map<String, Map<String, Object>> friendProfile = friendProfiles.stream()
                .collect(Collectors.toMap(
                        profile -> (String) profile.get("userId"), // key: userId
                        profile -> profile                          // value: 전체 프로필 데이터
                ));

        // 3. 친구들의 버킷 리스트 가져오기
        return bucketRepository.findBucketsByUserIds(friendIds)
                .stream()
                .map(bucket -> {
                    Map<String, Object> bucketMap = new HashMap<>();

                    // 친구 정보 추가
                    String tmpUserId = (String) bucket.get("userId"); // 버킷 소유자의 userId
                    Map<String, Object> profile = friendProfile.get(tmpUserId); // 해당 userId의 프로필 가져오기

                    if (profile != null) {
                        bucketMap.put("nickname", (String) profile.get("nickname"));
                        bucketMap.put("mbti", (String) profile.get("mbti"));
                        bucketMap.put("profileImage", (String) profile.get("profileImage"));
                    }

                    // 버킷 정보 추가
                    bucketMap.put("bucketName", bucket.get("bucketName"));
                    bucketMap.put("bucketContent", bucket.get("bucketContent"));

                    // achieveStatus가 true인 경우만 achieveDate 추가
                    if (Boolean.TRUE.equals(bucket.get("achieveStatus"))) {
                        bucketMap.put("achieveDate", bucket.get("achieveDate").toString());
                    }

                    return bucketMap;
                })
                .collect(Collectors.toList());
    }

}
