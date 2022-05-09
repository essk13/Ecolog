package com.thedebuggers.backend.service;

import com.thedebuggers.backend.common.util.Direction;
import com.thedebuggers.backend.common.util.GeometryUtil;
import com.thedebuggers.backend.common.util.Location;
import com.thedebuggers.backend.domain.entity.TrashCan;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.domain.repository.TrashCanRepository;
import com.thedebuggers.backend.dto.BaseUserInfoResDto;
import com.thedebuggers.backend.dto.TrashCanReqDto;

import com.thedebuggers.backend.dto.TrashCanResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.locationtech.jts.geom.Geometry;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.io.ParseException;
import org.locationtech.jts.io.WKTReader;


import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class TrashCanServiceImpl implements TrashCanService{

    private final TrashCanRepository trashCanRepository;
    private final S3Service s3Service;

    @Override
    public boolean registTrashCan(TrashCanReqDto trashCanReqDto, MultipartFile imageFile, User user) throws ParseException {

        String pointWKT = String.format("POINT(%s %s)", trashCanReqDto.getLng(), trashCanReqDto.getLat());
        Geometry geometry = new WKTReader().read(pointWKT);
        Point point = (Point) geometry;
        point.setSRID(4326);


        String imageUrl = null;
        if (imageFile != null) {
            imageUrl = s3Service.upload(imageFile);
        }

        TrashCan trashCan = TrashCan.builder()
                .address(trashCanReqDto.getAddress())
                .location(point)
                .image(imageUrl)
                .user(user)
                .build();

        trashCanRepository.save(trashCan);

        return true;
    }

    @Override
    public List<TrashCanResDto> getTrashCanList(double lat, double lng, double range) {

        Location northEast = GeometryUtil.calculate(lat, lng, range, Direction.NORTHEAST.getBearing());
        Location southWest = GeometryUtil.calculate(lat, lng, range, Direction.SOUTHWEST.getBearing());

        double x1 = northEast.getLatitude();
        double y1 = northEast.getLongitude();

        double x2 = southWest.getLatitude();
        double y2 = southWest.getLongitude();

        List<TrashCan> trashCanList = trashCanRepository.getTrashCanList(x1, y1, x2, y2);

        List<TrashCanResDto> trashCanResDtoList = trashCanList.stream().map(TrashCanResDto::of).collect(Collectors.toList());

        return trashCanResDtoList;
    }
}
