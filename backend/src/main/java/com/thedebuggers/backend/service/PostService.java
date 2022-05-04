package com.thedebuggers.backend.service;

import com.thedebuggers.backend.domain.entity.Post;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.dto.PostReqDto;
import com.thedebuggers.backend.dto.PostResDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostService {
    PostResDto registPost(User user, PostReqDto postReqDto, long communityNo, MultipartFile imageFile);

    List<PostResDto> getAllPost();

    List<PostResDto> getPostList(long communityNo);

    List<PostResDto> getMyPostList(long userNo);

    List<PostResDto> getMyPostListInCommunity(long communityNo, long userNo);

    Post getPost(long postNo);

    PostResDto getPost(User user, long postNo) throws Exception;

    boolean modifyPost(User user, long postNo, PostReqDto postDto, MultipartFile imageFile);

    boolean deletePost(User user, long postNo);

    boolean likePost(long postNo, long userNo);

}
