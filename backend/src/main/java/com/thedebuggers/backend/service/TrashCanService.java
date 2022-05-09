package com.thedebuggers.backend.service;

import com.thedebuggers.backend.domain.entity.TrashCan;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.TrashCanReqDto;
import com.thedebuggers.backend.dto.TrashCanResDto;
import org.locationtech.jts.io.ParseException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TrashCanService {
    boolean registTrashCan(TrashCanReqDto trashCanReqDto, MultipartFile imageFile, User user) throws ParseException;

    List<TrashCanResDto> getTrashCanList(double lat, double lng, double range);

    TrashCanResDto updateTrashCan(long trashCanNo, TrashCanReqDto trashCanReqDto, MultipartFile imageFile, User user) throws ParseException;

    boolean deleteTrashCan(long trashCanNo, User user);
}
