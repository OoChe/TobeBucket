package com.example.ToBeBucket.Service;

import com.example.ToBeBucket.DTO.EditBucketDTO;
import com.example.ToBeBucket.DTO.SemiGoalTitleDTO;
import com.example.ToBeBucket.DTO.WriteBucketDTO;
import com.example.ToBeBucket.Entity.*;
import com.example.ToBeBucket.Repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ManageBucketService {
    private final BucketRepository bucketRepository;
    private final UserProfileRepository userProfileRepository;
    private final BucketFriendRepository bucketFriendRepository;
    private final UserLoginRepository userLoginRepository;
    private final BucketSemiGoalRepository bucketSemiGoalRepository;
    private final UserBucketRepository userBucketRepository;

    //버킷 새로 만들기
    @Transactional
    public Integer saveNewBucket(String userId, WriteBucketDTO writeBucketDTO) {
        UserLogin user = userLoginRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("없는 사용자"));

        UserProfile userProfile = userProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("사용자 프로필 정보 없음"));

        Bucket bucket = getBucket(userId, writeBucketDTO, userProfile);
        bucketRepository.save(bucket);
        saveUserBucket(user, bucket);

        List<UserLogin> friends = new ArrayList<>();
        if (writeBucketDTO.getFriendNickNameList() != null) {
            for (String friendNickName : writeBucketDTO.getFriendNickNameList()) {
                UserProfile friendProfile = userProfileRepository.findByNickname(friendNickName)
                        .orElseThrow(() -> new RuntimeException("존재하지 않는 친구 닉네임입니다."));
                friends.add(friendProfile.getUserLogin());
            }
        }

        // 사용자와 친구 간 관계
        for (UserLogin friend : friends) {
            saveBucketFriend(user, friend, bucket);
            saveBucketFriend(friend, user, bucket);
            // 친구의 UserBucket 저장
            saveUserBucket(friend, bucket);
        }
        // 친구들 간 관계
        for (int i = 0; i < friends.size(); i++) {
            for (int j = i + 1; j < friends.size(); j++) {
                UserLogin friend1 = friends.get(i);
                UserLogin friend2 = friends.get(j);

                saveBucketFriend(friend1, friend2, bucket);
                saveBucketFriend(friend2, friend1, bucket);
            }
        }

        // SemiGoalBucket 생성
        if (writeBucketDTO.getSemiGoalData() != null) {
            for (SemiGoalTitleDTO semiGoalTitleDTO : writeBucketDTO.getSemiGoalData()) {
                String semiGoalTitle = semiGoalTitleDTO.getSemiGoalTitle();
                BucketSemiGoal bucketSemiGoal = new BucketSemiGoal();
                bucketSemiGoal.setSemiGoalTitle(semiGoalTitle);
                bucketSemiGoal.setBucket(bucket); // 여기서 id가 저장됨
                bucketSemiGoalRepository.save(bucketSemiGoal);
            }
        }

        return bucket.getBucketId();
    }

    // UserBucket 저장 메서드
    private void saveUserBucket(UserLogin user, Bucket bucket) {
        // 중복 저장 방지
        if (!userBucketRepository.existsByUserIdAndBucketId(user, bucket)) {
            UserBucket userBucket = new UserBucket();
            userBucket.setUserId(user);
            userBucket.setBucketId(bucket);
            userBucketRepository.save(userBucket);
        }
    }

    // BucketFriend 저장 메서드
    private void saveBucketFriend(UserLogin user, UserLogin friend, Bucket bucket) {
        // 중복 저장 방지
        if (!bucketFriendRepository.existsByUserLoginAndFriendAndBucket(user, friend, bucket)) {
            BucketFriend bucketFriend = new BucketFriend();
            bucketFriend.setUserLogin(user);
            bucketFriend.setFriend(friend);
            bucketFriend.setBucket(bucket);
            bucketFriendRepository.save(bucketFriend);
        }
    }


    private static Bucket getBucket(String  userId, WriteBucketDTO writeBucketDTO, UserProfile userProfile) {
        String userMbti = userProfile.getMbti();

        Bucket bucket = new Bucket();
        bucket.setUserId(userId);
        bucket.setMbti(userMbti);
        bucket.setBucketName(writeBucketDTO.getBucketName());
        bucket.setBucketContent(writeBucketDTO.getBucketContent());
        bucket.setCategory(writeBucketDTO.getCategory());
        bucket.setPublicStatus(writeBucketDTO.getPublicStatus());
        bucket.setCreateDate(writeBucketDTO.getCreateDate());
        if (writeBucketDTO.getGoalDate() != null) {
            bucket.setGoalDate(writeBucketDTO.getGoalDate());
        }
        return bucket;
    }

    //버킷 수정하기
    @Transactional
    public void editBucket(String userId, Integer bucketId, EditBucketDTO editBucketDTO) {
        UserLogin user = userLoginRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("없는 사용자"));

        Bucket bucket = bucketRepository.findById(bucketId)
                .orElseThrow(() -> new RuntimeException("없는 버킷"));

        updateBucketDetails(bucket, editBucketDTO);
        updateBucketFriends(bucket, user, editBucketDTO.getFriendNickNameList());
        updateBucketSemiGoal(bucket, editBucketDTO.getSemiGoalData());
    }

    //버킷 삭제하기
    public void deleteBucket(Integer bucketId) {
        Bucket bucket = bucketRepository.findById(bucketId)
                .orElseThrow(() -> new RuntimeException("없는 버킷입니다."));
        bucketRepository.delete(bucket);
    }


    // 버킷 세부내용 & 카테고리 수정 & 목표 달성 날짜 수정
    private void updateBucketDetails(Bucket bucket, EditBucketDTO editBucketDTO) {
        if (editBucketDTO.getBucketContent() != null) {
            bucket.setBucketContent(editBucketDTO.getBucketContent());
        }
        if (editBucketDTO.getCategory() != null) {
            bucket.setCategory(editBucketDTO.getCategory());
        }
        if (editBucketDTO.getGoalDate() != null) {
            bucket.setGoalDate(editBucketDTO.getGoalDate());
        }
        if (editBucketDTO.getPublicStatus() != null) {
            bucket.setPublicStatus(editBucketDTO.getPublicStatus());
        }
        bucketRepository.save(bucket);
    }
    //버킷 중간목표 수정
    private void updateBucketSemiGoal(Bucket bucket, List<SemiGoalTitleDTO> semiGoalData) {
        // 현재 가지고 있는 중간 목표 목록 가져오기
        List<BucketSemiGoal> currentSemiGoals = bucketSemiGoalRepository.findByBucket(bucket);
        if (semiGoalData != null) {
            for (SemiGoalTitleDTO semiGoalTitleDTO : semiGoalData) {
                String semiGoalTitle = semiGoalTitleDTO.getSemiGoalTitle();
                boolean exists = currentSemiGoals.stream()
                        .anyMatch(semiGoal -> semiGoal.getSemiGoalTitle().equals(semiGoalTitle));

                if (!exists) {
                    BucketSemiGoal bucketSemiGoal = new BucketSemiGoal();
                    bucketSemiGoal.setSemiGoalTitle(semiGoalTitle);
                    bucketSemiGoal.setBucket(bucket);
                    bucketSemiGoalRepository.save(bucketSemiGoal);
                }
            }
            List<String> newSemiGoalTitles = semiGoalData.stream()
                    .map(SemiGoalTitleDTO::getSemiGoalTitle)
                    .toList();
            for (BucketSemiGoal currentSemiGoal : currentSemiGoals) {
                if (!newSemiGoalTitles.contains(currentSemiGoal.getSemiGoalTitle())) {
                    bucketSemiGoalRepository.delete(currentSemiGoal);
                }
            }
        }else{
            //수정 요청 없으므로 기존 데이터 유지하도록
        }
    }

    // 친구 목록 수정
    private void updateBucketFriends(Bucket bucket, UserLogin user, List<String> newFriendNickNameList) {
        List<BucketFriend> currentFriends = bucketFriendRepository.findByBucket(bucket);

        // 친구 목록이 비어있거나 null이면 기존 친구 삭제
        if (newFriendNickNameList != null) {
            // 이전 친구 삭제
            deleteOldFriends(currentFriends, newFriendNickNameList, bucket, user);

            // 새로운 친구 추가
            addNewFriends(bucket, user, currentFriends, newFriendNickNameList);
        } else {
            // 친구 목록 수정 요청이 없는 경우 유지
            System.out.println("친구목록 변경사항 X");
        }
    }

    private void deleteOldFriends(List<BucketFriend> currentFriends, List<String> newFriendNickNameList, Bucket bucket, UserLogin user){
        for (BucketFriend currentFriend : currentFriends) {
            String currentNickname = getNicknameByUserId(currentFriend.getFriend().getUserId());

            // 이전에는 추가했었다가 이번에는 빼려고 하는 경우
            if (!newFriendNickNameList.contains(currentNickname)) {
                bucketFriendRepository.delete(currentFriend);

                // UserBucket에서도 삭제
                deleteUserBucketRelation(currentFriend.getFriend(), bucket);
            }
        }
    }
    private void addNewFriends(Bucket bucket, UserLogin user, List<BucketFriend> currentFriends, List<String> newFriendNickNameList) {
        for (String newFriendNickname : newFriendNickNameList) {
            boolean isFriendExist = isFriendExist(currentFriends, newFriendNickname);

            // 기존 친구 목록에 없으면 새로운 친구 추가
            if (!isFriendExist) {
                UserProfile friendProfile = userProfileRepository.findByNickname(newFriendNickname)
                        .orElseThrow(() -> new RuntimeException("존재하지 않는 친구 닉네임입니다."));
                UserLogin friend = friendProfile.getUserLogin();

                BucketFriend bucketFriend = new BucketFriend();
                bucketFriend.setUserLogin(user);
                bucketFriend.setBucket(bucket);
                bucketFriend.setFriend(friend);

                bucketFriendRepository.save(bucketFriend);

                // UserBucket에도 친구 추가
                addUserToBucket(friend, bucket);  // 친구 추가
            }
        }
    }
    private String getNicknameByUserId(String userId) {
        UserProfile userProfile = userProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("UserPrfile 없음"));
        return userProfile.getNickname();
    }
    private boolean isFriendExist(List<BucketFriend> currentFriends, String newFriendNickname) {
        return currentFriends.stream()
                .anyMatch(friend -> getNicknameByUserId(friend.getFriend().getUserId()).equals(newFriendNickname));
    }
    private void deleteUserBucketRelation(UserLogin user, Bucket bucket) {
        List<UserBucket> userBuckets = userBucketRepository.findByUserIdAndBucketId(user, bucket);
        userBucketRepository.deleteAll(userBuckets);
    }
    private void addUserToBucket(UserLogin user, Bucket bucket) {
        UserBucket userBucket = new UserBucket();
        userBucket.setUserId(user);
        userBucket.setBucketId(bucket);
        userBucketRepository.save(userBucket);
    }

}