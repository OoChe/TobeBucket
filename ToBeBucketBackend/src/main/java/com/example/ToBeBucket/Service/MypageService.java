package com.example.ToBeBucket.Service;

import com.example.ToBeBucket.Repository.AchieveBucketRepository;
import com.example.ToBeBucket.Repository.BucketRepository;
import com.example.ToBeBucket.Repository.UserPointRepository;
import com.example.ToBeBucket.Repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@Slf4j
@RequiredArgsConstructor
public class MypageService {
    private final UserProfileRepository userProfileRepository;
    private final UserPointRepository userPointRepository;
    private final BucketRepository bucketRepository;
    private final AchieveBucketRepository achieveBucketRepository;

    public Map<String, Object> getMyPageData(String userId) {
        Map<String, Object> result = new HashMap<>();

        Map<String, Object> profile = userProfileRepository.findProfileByUserId(userId);
        result.put("profile", profile);

        Integer point = userPointRepository.findPointByUserId(userId);
        result.put("point", point != null ? point : 0);

        List<Map<String, Object>> userBuckets = bucketRepository.findBucketsByUserId(userId);
        long totalBuckets = userBuckets.size();
        long achievedBuckets = userBuckets.stream()
                .filter(bucket -> Boolean.TRUE.equals(bucket.get("achieveStatus")))
                .count();
        int achieveRate = totalBuckets > 0 ? (int) ((achievedBuckets * 100) / totalBuckets) : 0;
        result.put("achieveRate", achieveRate);

        int currentYear = LocalDate.now().getYear();
        List<Map<String, Object>> achieveGraph = getAchieveGraph(userId, currentYear);
        result.put("achieveGraph", achieveGraph);

        List<Map<String, Object>> categoryRate = getCategoryRate(userBuckets);
        result.put("categoryRate", categoryRate);

        return result;
    }

    private List<Map<String, Object>> getAchieveGraph(String userId, int currentYear) {
        List<Integer> bucketIds = bucketRepository.findAchievedBucketIdsByUserId(userId)
                .stream()
                .map(Integer::valueOf)
                .collect(Collectors.toList());
        log.debug("Bucket IDs retrieved: {}", bucketIds);

        if (bucketIds.isEmpty()) {
            log.warn("No bucket IDs found for userId: {}", userId);
            return List.of();
        }

        List<Map<String, Object>> achieveDates = achieveBucketRepository.findAchieveDatesByBucketIds(bucketIds);
        log.debug("Achieve dates retrieved for bucket IDs {}: {}", bucketIds, achieveDates);

        if (achieveDates.isEmpty()) {
            log.warn("No achieve dates found for bucket IDs: {}", bucketIds);
            return List.of();
        }

        Map<Integer, int[]> yearlyAchieveCounts = new HashMap<>();

        for (Map<String, Object> achieve : achieveDates) {
            LocalDate achieveDate = LocalDate.parse(achieve.get("achieveDate").toString(), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            int year = achieveDate.getYear();
            int month = achieveDate.getMonthValue();

            yearlyAchieveCounts.putIfAbsent(year, new int[2]);
            if (month <= 6) {
                yearlyAchieveCounts.get(year)[0]++;
            } else {
                yearlyAchieveCounts.get(year)[1]++;
            }
        }

        List<Map<String, Object>> achieveGraph = Arrays.asList(currentYear, currentYear - 1)
                .stream()
                .map(year -> {
                    int[] counts = yearlyAchieveCounts.getOrDefault(year, new int[2]);
                    Map<String, Object> yearData = new HashMap<>();
                    yearData.put("year", year);
                    yearData.put("first", counts[0]);
                    yearData.put("second", counts[1]);
                    return yearData;
                })
                .collect(Collectors.toList());

        log.debug("Achieve graph: {}", achieveGraph);
        return achieveGraph;

    }

    private List<Map<String, Object>> getCategoryRate(List<Map<String, Object>> userBuckets) {
        int[] categoryCounts = new int[6];
        userBuckets.forEach(bucket -> {
            Integer category = (Integer) bucket.get("category");
            if (category != null && category >= 0 && category < categoryCounts.length) {
                categoryCounts[category]++;
            }
        });

        int totalBuckets = Arrays.stream(categoryCounts).sum();

        return IntStream.range(0, categoryCounts.length)
                .mapToObj(index -> {
                    Map<String, Object> categoryRate = new HashMap<>();
                    categoryRate.put("category", index);
                    categoryRate.put("rate", totalBuckets > 0 ? (categoryCounts[index] * 100) / totalBuckets : 0);
                    return categoryRate;
                })
                .sorted((a, b) -> (Integer) b.get("rate") - (Integer) a.get("rate"))
                .limit(3)
                .collect(Collectors.toList());

    }
}
