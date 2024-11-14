package com.example.ToBeBucket.Repository;

import com.example.ToBeBucket.Entity.UserAlarm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlarmRepository extends JpaRepository<UserAlarm, Integer> {
}
