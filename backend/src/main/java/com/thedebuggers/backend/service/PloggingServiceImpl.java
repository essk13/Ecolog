package com.thedebuggers.backend.service;

import com.thedebuggers.backend.common.exception.CustomException;
import com.thedebuggers.backend.common.util.ErrorCode;
import com.thedebuggers.backend.domain.entity.Plogging;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.domain.repository.PloggingRepository;
import com.thedebuggers.backend.dto.PloggingReqDto;
import com.thedebuggers.backend.dto.PloggingResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PloggingServiceImpl implements PloggingService {

    private final PloggingRepository ploggingRepository;

    private final S3Service s3Service;

    @Override
    public PloggingResDto registPlogging(User user, PloggingReqDto ploggingReqDto, List<MultipartFile> imageFileList) {

        if (imageFileList.size() < 2) {
            throw new CustomException(ErrorCode.CONTENT_NOT_FILLED);
        }
        List<String> imageUrls = s3Service.upload(imageFileList);

        Plogging plogging = Plogging.builder()
                .startedAt(ploggingReqDto.getStartedAt())
                .endedAt(ploggingReqDto.getEndedAt())
                .resultImg(imageUrls.get(0))
                .routeImg(imageUrls.get(1))
                .time(ploggingReqDto.getTime())
                .distance(ploggingReqDto.getDistance())
                .calories(ploggingReqDto.getCalories())
                .user(user)
                .build();

        plogging = ploggingRepository.save(plogging);
        PloggingResDto ploggingResDto = PloggingResDto.of(plogging);
        return ploggingResDto;
    }

    @Override
    public List<PloggingResDto> getPloggingList(long userNo) {
        List<PloggingResDto> ploggingResDtoList = ploggingRepository.findAllByUserNo(userNo).stream().map(PloggingResDto::of).collect(Collectors.toList());
        return ploggingResDtoList;
    }

    @Override
    public PloggingResDto getPlogging(long ploggingNo) {
        Plogging plogging = ploggingRepository.findById(ploggingNo).orElseThrow(() -> new CustomException(ErrorCode.CONTENT_NOT_FOUND));
        PloggingResDto ploggingResDto = PloggingResDto.of(plogging);
        return ploggingResDto;
    }
}
