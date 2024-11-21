package com.example.ToBeBucket.Repository;

import com.example.ToBeBucket.Entity.UserAlarm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AlarmRepository extends JpaRepository<UserAlarm, Integer> {
    @Modifying
    @Query("UPDATE UserAlarm a SET a.readStatus = :readStatus WHERE a.alarmId = :alarmId")
    void updateReadStatus(Integer alarmId, Boolean readStatus);

    @Modifying
    @Query("UPDATE UserAlarm a SET a.readStatus = :readStatus WHERE a.alarmId IN :readAllAlarm")
    void markReadStatusForMultipleAlarms(List<Integer> readAllAlarm, Boolean readStatus);
}
