package com.thedebuggers.backend.controller;

import com.thedebuggers.backend.auth.ELUserDetails;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.TrashCanReqDto;
import com.thedebuggers.backend.dto.TrashCanResDto;
import com.thedebuggers.backend.service.TrashCanService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.io.ParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Api(value = "쓰레기통 관련 API", tags = "Trash_Can")
@Slf4j
@RequestMapping("/api/v1/trash_can")
@RequiredArgsConstructor
@RestController
public class TrashCanController {

    private final TrashCanService trashCanService;

    @PostMapping
    @ApiOperation(value = "쓰레기통 위치 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<Boolean> registTrashCan(
            @RequestPart(value = "trash_can_info") TrashCanReqDto trashCanReqDto,
            @RequestPart(value = "image", required = false) MultipartFile imageFile,
            Authentication authentication
    ) throws ParseException {
        ELUserDetails userDetails = (ELUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        boolean result = trashCanService.registTrashCan(trashCanReqDto, imageFile, user);

        return ResponseEntity.ok(result);
    }

    @GetMapping
    @ApiOperation(value = "쓰레기통 위치 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<List<TrashCanResDto>> getTrashCanList(
            @ApiParam(value = "위도") @RequestParam(value = "lat") double lat,
            @ApiParam(value = "경도") @RequestParam(value = "lng") double lng,
            @ApiParam(value = "범위 단위는 km") @RequestParam(value = "range") double range
    ) {
        List<TrashCanResDto> trashCanList = trashCanService.getTrashCanList(lat, lng, range);

        return ResponseEntity.ok(trashCanList);
    }

    @PutMapping
    @ApiOperation(value = "쓰레기통 정보 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not Found"),
            @ApiResponse(code = 500, message = "Server Error")
    })
    private ResponseEntity<TrashCanResDto> updateTrashCan(
            @RequestPart(value = "trash_can_info") TrashCanReqDto trashCanReqDto,
            @RequestPart(value = "image", required = false) MultipartFile imageFile,
            Authentication authentication
    ) throws ParseException{
        ELUserDetails userDetails = (ELUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        TrashCanResDto trashCanResDto = trashCanService.updateTrashCan(trashCanReqDto, imageFile, user);
        return ResponseEntity.ok(trashCanResDto);
    }

}
