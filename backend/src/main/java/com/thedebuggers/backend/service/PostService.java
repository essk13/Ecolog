package com.thedebuggers.backend.service;

import com.thedebuggers.backend.domain.entity.Post;
import com.thedebuggers.backend.dto.PostDto;

import java.util.List;

public interface PostService {
    boolean registPost(PostDto postDto);

    List<Post> getAllPost();

    List<Post> getPostList(long communityNo);

    Post getPost(long postNo);

    boolean modifyPost(long postNo, PostDto postDto);

    boolean deletePost(long postNo);

    boolean likePost(long postNo, long userNo);
}
