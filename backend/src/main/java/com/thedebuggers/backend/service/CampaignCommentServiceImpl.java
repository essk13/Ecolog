package com.thedebuggers.backend.service;

import com.thedebuggers.backend.common.exception.CustomException;
import com.thedebuggers.backend.common.util.ErrorCode;
import com.thedebuggers.backend.domain.entity.*;
import com.thedebuggers.backend.domain.repository.CampaignCommentRepository;
import com.thedebuggers.backend.domain.repository.CampaignRespository;
import com.thedebuggers.backend.domain.repository.CommentRepository;
import com.thedebuggers.backend.dto.CommentReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CampaignCommentServiceImpl implements CampaignCommentService{

    private final CampaignCommentRepository campaignCommentRepository;
    private final CampaignRespository campaignRepository;

    @Override
    public List<CampaignComment> getCampaignCommentList(long campaignNo) {
        return campaignCommentRepository.findByCampaignNo(campaignNo);
    }

    @Override
    public void registCampaignComment(long campaignNo, User user, CommentReqDto commentDto) {

        Campaign campaign = campaignRepository.findByNo(campaignNo).orElseThrow(() -> new CustomException(ErrorCode.CONTENT_NOT_FOUND));

        CampaignComment campaignComment = CampaignComment.builder()
                .campaign(campaign)
                .user(user)
                .content(commentDto.getContent())
                .build();

        campaignCommentRepository.save(campaignComment);
    }

    @Override
    public CampaignComment getCampaignCommentByNo(long campaignCommentNo) {
        return campaignCommentRepository.findByNo(campaignCommentNo).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND));
    }

    @Override
    public void updateCampaignComment(long campaignCommentNo, CommentReqDto commentDto, User user){

        CampaignComment campaignComment = getCampaignCommentByNo(campaignCommentNo);

        validateCampaignCommentUser(campaignComment, user);

        campaignComment.setContent(commentDto.getContent());

        campaignCommentRepository.save(campaignComment);
    }

    @Override
    public void deleteCampaignComment(long campaignCommentNo, User user) {

        CampaignComment campaignComment = getCampaignCommentByNo(campaignCommentNo);

        validateCampaignCommentUser(campaignComment, user);

        campaignCommentRepository.delete(campaignComment);
    }

    @Override
    public List<CampaignComment> getUserCampaignCommentsInCommunity(long communityNo, long userNo) {
        return campaignCommentRepository.getUserCampaignCommentsInCommunity(communityNo, userNo);
    }

    public void validateCampaignCommentUser(CampaignComment campaignComment, User user){
        if (campaignComment.getUser().getNo() != user.getNo()) throw new CustomException(ErrorCode.METHOD_NOT_ALLOWED);
    }
}
