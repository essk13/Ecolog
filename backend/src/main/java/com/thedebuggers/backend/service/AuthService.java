package com.thedebuggers.backend.service;

import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.TokenDto;

public interface AuthService {
    TokenDto login(User user);

    void logout(String userEmail);

    TokenDto reissue(String refreshToken) throws Exception;
}
