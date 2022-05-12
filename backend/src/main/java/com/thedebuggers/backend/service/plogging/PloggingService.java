package com.thedebuggers.backend.service.plogging;

import com.thedebuggers.backend.domain.entity.user.User;
import com.thedebuggers.backend.dto.plogging.PloggingReqDto;
import com.thedebuggers.backend.dto.plogging.PloggingResDto;
import com.thedebuggers.backend.dto.user.RankingResDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PloggingService {
    PloggingResDto registPlogging(User user, PloggingReqDto ploggingReqDto, List<MultipartFile> imageFileList);

    List<PloggingResDto> getPloggingList(long userNo);

    PloggingResDto getPlogging(long ploggingNo);

    List<RankingResDto> getRankingByTime(String type);

    List<RankingResDto> getRankingByFollow(User user, String type);

    List<RankingResDto> getRankingByAddress(User user, String type);
}
