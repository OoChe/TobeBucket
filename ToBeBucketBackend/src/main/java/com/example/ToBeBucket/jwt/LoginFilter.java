package com.example.ToBeBucket.jwt;

import com.example.ToBeBucket.DTO.CustomUserDetails;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.coyote.Response;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;
import java.util.Map;

public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    //jwt 토큰 발급을 위한
    private final JWTUtil jwtUtil;
    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil) {

        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void setFilterProcessesUrl(String filterProcessesUrl) {
        super.setFilterProcessesUrl("/tobebucket/login");
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        //username, password custom
        String userId = null;
        String pwd = null;
        try {
            if (request.getContentType() != null && request.getContentType().contains("application/json")) {
                //json 타입으로 처리하는 경우
                ObjectMapper objectMapper = new ObjectMapper();
                Map<String,String> credentials = objectMapper.readValue(request.getInputStream(), Map.class);
                userId = credentials.get("userId");
                pwd = credentials.get("pwd");
            }else{ //form 데이터로 처리하는 경우
                userId = request.getParameter("userId");
                pwd = request.getParameter("pwd");
            }
        }
        catch(IOException e){
            e.printStackTrace();
            throw new RuntimeException("login 정보 가져오는데 실패했습니다.");
        }

        if (userId == null || pwd == null) {
            throw new RuntimeException("값이 제대로 들어오지 않았습니다.");
        }

        //스프링 시큐리티에서 username과 password를 검증하기 위해서는 token에 담아야 함 (DTO같은 개념!)
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userId, pwd, null);

        //token에 담은 검증을 위한 AuthenticationManager로 전달
        return authenticationManager.authenticate(authToken);
    }

    //로그인 성공시 실행하는 메소드 (여기서 JWT를 발급하면 됨)
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {
        //유저 정보 가져오기
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        String userId = customUserDetails.getUsername();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();

        String role = auth.getAuthority();
        //username과 role 값을 가지고 토큰 발급 요청하는 메서드임.
        String token = jwtUtil.createJwt(userId, role, 60*60*1000L);

        try {
            response.setHeader("Authorization", "Bearer " + token);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write("{\"code\": \"SU\", \"message\": \"Success.\", \"token\": \"" + token + "\"}");
        } catch (IOException e) {
            // 예외 처리 (예: 로그 남기기, 또는 다른 응답 반환 등)
            e.printStackTrace();
        }

    }

    //로그인 실패시 실행하는 메소드
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
        response.setStatus(401);
    }
}