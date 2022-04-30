package com.thedebuggers.backend.controller;

import com.thedebuggers.backend.dto.ImageUploadResDto;
import com.thedebuggers.backend.service.S3Service;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Api(value = "이미지 API", tags = {"Image"})
@Slf4j
@RequestMapping("/api/v1/image")
@RequiredArgsConstructor
@RestController
public class ImageController {

    private final S3Service s3Service;

    @PostMapping("/upload")
    @ApiOperation(value = "이미지 업로드")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<?> upload(@RequestPart("image_file")MultipartFile imageFile) {

        String imageUrl = null;
        try {
            imageUrl = s3Service.upload(imageFile);
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed");
        }

        return ResponseEntity.ok(new ImageUploadResDto(imageUrl));
    }
}
