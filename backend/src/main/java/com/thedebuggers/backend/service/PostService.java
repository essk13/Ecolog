package com.thedebuggers.backend.service;

import com.thedebuggers.backend.domain.entity.Post;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.PostReqDto;

import java.util.Collection;
import java.util.List;

public interface PostService {
    Post registPost(User user, PostReqDto postReqDto, long communityNo);

    List<Post> getAllPost();

    List<Post> getPostList(long communityNo);

    List<Post> getMyPostList(long userNo);

    List<Post> getMyPostListInCommunity(long communityNo, long userNo);

    Post getPost(long postNo);

    Post getPost(User user, long postNo) throws Exception;

    boolean modifyPost(User user, long postNo, PostReqDto postDto);

    boolean deletePost(User user, long postNo);

    boolean likePost(long postNo, long userNo);

}
