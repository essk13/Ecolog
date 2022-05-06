package com.thedebuggers.backend.service;

import com.thedebuggers.backend.common.exception.CustomException;
import com.thedebuggers.backend.common.util.ErrorCode;
import com.thedebuggers.backend.domain.entity.Plogging;
import com.thedebuggers.backend.domain.entity.RankingData;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.domain.repository.PloggingRepository;
import com.thedebuggers.backend.domain.repository.UserRepository;
import com.thedebuggers.backend.dto.PloggingReqDto;
import com.thedebuggers.backend.dto.PloggingResDto;
import com.thedebuggers.backend.dto.RankingResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PloggingServiceImpl implements PloggingService {

    private final PloggingRepository ploggingRepository;
    private final UserRepository userRepository;

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

    @Override
    public List<RankingResDto> getRankingByTime(String type) {
        List<RankingResDto> rankingResDtoList = new ArrayList<>();

        String startDay = "20000101";
        String endDay = new SimpleDateFormat("yyyyMMdd").format(Calendar.getInstance(Locale.KOREA).getTime());

        switch (type) {
            case "week":
                startDay = startOfWeek();
                endDay = endOfWeek();
                break;
            case "month":
                startDay = endDay.substring(0, 6).concat("01");
                endDay = endOfMonth();
                break;
            case "all":
                break;
            default:
                throw new CustomException(ErrorCode.BAD_REQUEST);
        }

        System.out.println("Start Day: " + startDay);
        System.out.println("End Day: " + endDay);

        ploggingRepository.getRankingByTime(startDay, endDay, RankingData.class).forEach(
                data -> {
                    User user = userRepository.findByNo(data.getUser_no()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));
                    rankingResDtoList.add(RankingResDto.of(user, data.getCnt(), data.getDist()));
                }
        );

        return rankingResDtoList;
    }

    private String startOfWeek() {
        Calendar calendar = Calendar.getInstance(Locale.KOREA);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");

        calendar.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
        return dateFormat.format(calendar.getTime());
    }

    private String endOfWeek() {
        Calendar calendar = Calendar.getInstance(Locale.KOREA);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");

        calendar.set(Calendar.DAY_OF_WEEK, Calendar.SATURDAY);
        return dateFormat.format(calendar.getTime());
    }

    private String endOfMonth() {
        Calendar calendar = Calendar.getInstance(Locale.KOREA);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");

        calendar.set(Calendar.DATE, calendar.getActualMaximum(calendar.DAY_OF_MONTH));
        return dateFormat.format(calendar.getTime());
    }
}
