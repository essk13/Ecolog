package com.thedebuggers.backend.controller;

import com.thedebuggers.backend.auth.JwtTokenUtil;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.LoginReqDto;
import com.thedebuggers.backend.dto.LoginResDto;
import com.thedebuggers.backend.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@Api(value = "인증 관련 API", tags = {"Auth", "Login", "Logout"})
@Slf4j
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@RestController
public class AuthController {

    private static final String ACCESS_TOKEN = "access_token";
    private static final String REFRESH_TOKEN = "refresh_token";

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    @ApiOperation(value = "로그인")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<?> login(@RequestBody LoginReqDto loginDto){

        User user = userService.getUserByEmail(loginDto.getEmail());

        if (user != null){

            if (user.getLoginType() != loginDto.getLoginType()){
                return ResponseEntity.badRequest().body("Login Type Not Matched");
            }

            if (!user.getPassword().equals(passwordEncoder.encode(loginDto.getId() + loginDto.getPassword()))){
                return ResponseEntity.badRequest().body("Bad Request");
            }

            user = userService.updateUser(loginDto);
        }else {
            user = userService.createUser(loginDto);
        }

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(ACCESS_TOKEN, JwtTokenUtil.getAccessToken(user.getEmail()));
        httpHeaders.add(REFRESH_TOKEN, JwtTokenUtil.getRefreshToken(user.getEmail()));

        return new ResponseEntity<>(LoginResDto.of(user), httpHeaders, HttpStatus.OK);
    }
}
