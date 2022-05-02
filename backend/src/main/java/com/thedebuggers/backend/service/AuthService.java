package com.thedebuggers.backend.service;

import com.thedebuggers.backend.dto.LoginReqDto;
import com.thedebuggers.backend.dto.TokenDto;

public interface AuthService {
    TokenDto login(LoginReqDto loginDto);

    void logout(String userEmail);

    TokenDto reissue(String refreshToken);
}
