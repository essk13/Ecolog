package com.thedebuggers.backend.service;

import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.LoginReqDto;
import com.thedebuggers.backend.dto.UserUpdateReqDto;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    User getUserByEmail(String email);

    User createUser(LoginReqDto loginDto);

    User getUserByUserNo(Long userNo);

    void deleteUser(User user);

    void updateUser(User user, UserUpdateReqDto updateDto, MultipartFile imageFile);
}