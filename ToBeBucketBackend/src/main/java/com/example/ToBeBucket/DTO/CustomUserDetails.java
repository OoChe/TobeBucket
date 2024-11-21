package com.example.ToBeBucket.DTO;

import com.example.ToBeBucket.Entity.UserLogin;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

public class CustomUserDetails implements UserDetails {

    private final UserLogin userLogin;
    public CustomUserDetails(UserLogin userData) {
        this.userLogin = userData; //초기화
    }

    @Override
    //Role 리턴
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> collection = new ArrayList<>();

        collection.add(new GrantedAuthority() {

            @Override
            public String getAuthority() {
                return "ROLE_" + userLogin.getRole();
            }
        });

        return collection;
    }

    //pwd & username 리턴
    @Override
    public String getPassword() {
        return userLogin.getPwd();
    }

    @Override
    public String getUsername() {
        return userLogin.getUserId();
    }

    @Override
    public boolean isAccountNonExpired() {

        return true;
    }

    @Override
    public boolean isAccountNonLocked() {

        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {

        return true;
    }

    @Override
    public boolean isEnabled() {

        return true;
    }
}