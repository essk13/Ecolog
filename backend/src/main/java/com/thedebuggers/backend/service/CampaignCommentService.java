package com.thedebuggers.backend.service;

import com.thedebuggers.backend.domain.entity.CampaignComment;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.CommentReqDto;
import com.thedebuggers.backend.dto.CommentResDto;

import java.util.List;

public interface CampaignCommentService {
    List<CommentResDto> getCampaignCommentList(long campaignNo);

    void registCampaignComment(long campaignNo, User user, CommentReqDto commentDto);

    CommentResDto getCampaignCommentByNo(long campaignCommentNo);

    void updateCampaignComment(long campaignCommentNo, CommentReqDto commentDto, User user);

    void deleteCampaignComment(long campaignCommentNo, User user);

    List<CommentResDto> getUserCampaignCommentsInCommunity(long communityNo, long userNo);
}
