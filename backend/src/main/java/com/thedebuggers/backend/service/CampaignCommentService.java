package com.thedebuggers.backend.service;

import com.thedebuggers.backend.domain.entity.CampaignComment;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.CommentReqDto;

import java.util.List;

public interface CampaignCommentService {
    List<CampaignComment> getCampaignCommentList(long campaignNo);

    void registCampaignComment(long campaignNo, User user, CommentReqDto commentDto);

    CampaignComment getCampaignCommentByNo(long campaignCommentNo);

    void updateCampaignComment(long campaignCommentNo, CommentReqDto commentDto, User user);

    void deleteCampaignComment(long campaignCommentNo, User user);

    List<CampaignComment> getUserCampaignCommentsInCommunity(long communityNo, long userNo);
}
