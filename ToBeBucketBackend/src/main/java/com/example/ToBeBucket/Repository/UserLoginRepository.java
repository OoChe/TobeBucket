package com.example.ToBeBucket.Repository;

import com.example.ToBeBucket.Entity.UserLogin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserLoginRepository extends JpaRepository<UserLogin,String> {
    UserLogin findByUserId(String userId);
}
