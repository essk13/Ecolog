package com.thedebuggers.backend.controller;

import com.thedebuggers.backend.auth.ELUserDetails;
import com.thedebuggers.backend.auth.JwtTokenUtil;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.LoginReqDto;
import com.thedebuggers.backend.dto.LoginResDto;
import com.thedebuggers.backend.dto.TokenDto;
import com.thedebuggers.backend.dto.TokenReqDto;
import com.thedebuggers.backend.service.AuthService;
import com.thedebuggers.backend.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Api(value = "인증 관련 API", tags = {"Auth"})
@Slf4j
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@RestController
public class AuthController {

    private static final String ACCESS_TOKEN = "access_token";
    private static final String REFRESH_TOKEN = "refresh_token";

    private final AuthService authService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    private final RedisTemplate redisTemplate;

    @PostMapping("/login")
    @ApiOperation(value = "로그인")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<?> login(@RequestBody LoginReqDto loginDto){
        boolean firstLogin = false;

        User user = userService.getUserByEmail(loginDto.getEmail());

        if (user != null){

            if (user.getLoginType() != loginDto.getLoginType()){
                return ResponseEntity.badRequest().body("Login Type Not Matched");
            }

            if (!passwordEncoder.matches(loginDto.getId() + loginDto.getEmail(), user.getPassword())){
                return ResponseEntity.badRequest().body("Bad Request");
            }

        }else {
            firstLogin = true;
            user = userService.createUser(loginDto);
        }

        TokenDto tokenDto = authService.login(user);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(ACCESS_TOKEN, tokenDto.getAccessToken());
        httpHeaders.add(REFRESH_TOKEN, tokenDto.getRefreshToken());

        return new ResponseEntity<>(LoginResDto.of(firstLogin), httpHeaders, HttpStatus.OK);
    }

    @PostMapping("/reissue")
    @ApiOperation(value = "access token 재발급")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<?> reissue(@RequestBody TokenReqDto tokenReqDto){

        TokenDto tokenDto = null;
        try {
            tokenDto = authService.reissue(tokenReqDto.getRefreshToken());
        }catch (Exception e){
            return ResponseEntity.badRequest().body("Token is Invalid");
        }

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(ACCESS_TOKEN, tokenDto.getAccessToken());
        httpHeaders.add(REFRESH_TOKEN, tokenDto.getRefreshToken());

        return new ResponseEntity<>("Success", httpHeaders, HttpStatus.OK);
    }

    @GetMapping("/logout")
    @ApiOperation(value = "logout")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<?> logout(Authentication authentication){

        ELUserDetails userDetails = (ELUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        try {
            authService.logout(user.getEmail());
        }catch (Exception e){
            return ResponseEntity.badRequest().body("잘못된 접근");
        }

        return ResponseEntity.ok("Success");
    }
}
