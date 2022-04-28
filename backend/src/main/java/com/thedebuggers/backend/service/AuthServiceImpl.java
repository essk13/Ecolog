package com.thedebuggers.backend.service;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.thedebuggers.backend.auth.JwtTokenUtil;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.TokenDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final RedisTemplate redisTemplate;
    private final UserService userService;

    @Override
    public TokenDto login(User user) {
        ValueOperations<String, String> values = redisTemplate.opsForValue();

        String userEmail = user.getEmail();
        String accessToken = JwtTokenUtil.getAccessToken(userEmail);
        String refreshToken = JwtTokenUtil.getRefreshToken(userEmail);

        TokenDto tokenDto = TokenDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();

        values.set(userEmail, refreshToken, JwtTokenUtil.getRefreshExpirationTime(), TimeUnit.SECONDS);

        return tokenDto;
    }

    @Override
    public void logout(String userEmail) {
        redisTemplate.delete(userEmail);
    }

    @Override
    public TokenDto reissue(String refreshToken) throws Exception {

        ValueOperations<String, String> values = redisTemplate.opsForValue();

        JWTVerifier verifier = JwtTokenUtil.getVerifier();

        JwtTokenUtil.handleError(refreshToken);
        DecodedJWT decodedJWT = verifier.verify(refreshToken);
        String userEmail = decodedJWT.getSubject();

        User user = userService.getUserByEmail(userEmail);

        if (user == null || !values.get(userEmail).equals(refreshToken)) throw new Exception();

        String accessToken = JwtTokenUtil.getAccessToken(userEmail);

        TokenDto tokenDto = TokenDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();

        return tokenDto;
    }
}
