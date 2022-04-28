package com.thedebuggers.backend.service;

import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.LoginReqDto;
import com.thedebuggers.backend.dto.UserUpdateReqDto;

public interface UserService {
    User getUserByEmail(String email);

    User updateUser(LoginReqDto loginDto);

    User createUser(LoginReqDto loginDto);

    User getUserByUserNo(Long userNo);

    void deleteUser(User user) throws Exception;

    void updateUser(User user, UserUpdateReqDto updateDto) throws Exception;
}