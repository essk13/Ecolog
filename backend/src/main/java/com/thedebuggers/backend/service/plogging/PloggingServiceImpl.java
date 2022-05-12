package com.thedebuggers.backend.service.plogging;

import com.thedebuggers.backend.common.exception.CustomException;
import com.thedebuggers.backend.common.util.ErrorCode;
import com.thedebuggers.backend.domain.entity.plogging.Plogging;
import com.thedebuggers.backend.domain.entity.user.RankingData;
import com.thedebuggers.backend.domain.entity.user.User;
import com.thedebuggers.backend.domain.repository.plogging.PloggingRepository;
import com.thedebuggers.backend.domain.repository.user.UserFollowRepository;
import com.thedebuggers.backend.domain.repository.user.UserRepository;
import com.thedebuggers.backend.dto.plogging.PloggingReqDto;
import com.thedebuggers.backend.dto.plogging.PloggingResDto;
import com.thedebuggers.backend.dto.user.RankingResDto;
import com.thedebuggers.backend.common.util.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PloggingServiceImpl implements PloggingService {

    private final PloggingRepository ploggingRepository;
    private final UserRepository userRepository;
    private final UserFollowRepository userFollowRepository;

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

        Map<String, String> dateInfo = getDate(type);
        String startDay = dateInfo.get("startDay");
        String endDay = dateInfo.get("endDay");

        if (startDay.isEmpty() || endDay.isEmpty())
            throw new CustomException(ErrorCode.BAD_REQUEST);

        ploggingRepository.getRankingByTime(startDay, endDay, RankingData.class).forEach(
                data -> {
                    User u = userRepository.findByNo(data.getUserNo()).orElseThrow(() -> new CustomException(ErrorCode.CONTENT_NOT_FOUND));
                    rankingResDtoList.add(RankingResDto.of(u, data.getCnt(), data.getDist()));
                }
        );

        return rankingResDtoList;
    }

    @Override
    public List<RankingResDto> getRankingByFollow(User user, String type) {
        List<RankingResDto> rankingResDtoList = new ArrayList<>();
        List<User> followList = userFollowRepository.findAllFolloweeByFollower(user);
        followList.add(user);

        Map<String, String> dateInfo = getDate(type);
        String startDay = dateInfo.get("startDay");
        String endDay = dateInfo.get("endDay");

        if (startDay.isEmpty() || endDay.isEmpty())
            throw new CustomException(ErrorCode.BAD_REQUEST);

        ploggingRepository.getRankingByFollow(followList, startDay, endDay, RankingData.class).forEach(
                data -> {
                    User u = userRepository.findByNo(data.getUserNo()).orElseThrow(() -> new CustomException(ErrorCode.CONTENT_NOT_FOUND));
                    rankingResDtoList.add(RankingResDto.of(u, data.getCnt(), data.getDist()));
                }
        );

        return rankingResDtoList;
    }

    @Override
    public List<RankingResDto> getRankingByAddress(User user, String type) {
        List<RankingResDto> rankingResDtoList = new ArrayList<>();
        String address = user.getAddress();

        Map<String, String> dateInfo = getDate(type);
        String startDay = dateInfo.get("startDay");
        String endDay = dateInfo.get("endDay");

        if (startDay.isEmpty() || endDay.isEmpty())
            throw new CustomException(ErrorCode.BAD_REQUEST);

        ploggingRepository.getRankingByAddress(address, startDay, endDay, RankingData.class).forEach(
                data -> {
                    User u = userRepository.findByNo(data.getUserNo()).orElseThrow(() -> new CustomException(ErrorCode.CONTENT_NOT_FOUND));
                    rankingResDtoList.add(RankingResDto.of(u, data.getCnt(), data.getDist()));
                }
        );

        return rankingResDtoList;
    }

    private Map<String, String> getDate(String type) {
        Map<String, String> dateInfo = new HashMap<>();
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

        dateInfo.put("startDay", startDay);
        dateInfo.put("endDay", endDay);
        return dateInfo;
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
