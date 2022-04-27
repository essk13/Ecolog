package com.thedebuggers.backend.service;

import com.thedebuggers.backend.domain.entity.Community;
import com.thedebuggers.backend.domain.entity.Post;
import com.thedebuggers.backend.domain.entity.User;
import com.thedebuggers.backend.domain.repository.CommunityRepository;
import com.thedebuggers.backend.domain.repository.PostRepository;
import com.thedebuggers.backend.domain.repository.UserRepository;
import com.thedebuggers.backend.dto.PostDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CommunityRepository communityRepository;

    @Override
    public boolean registPost(PostDto postDto) {
        Post post = Post.builder()
                .title(postDto.getTitle())
                .content(postDto.getContent())
                .image(postDto.getImage())
                .createdAt(LocalDateTime.now())
                .isOpen(postDto.isOpen())
                .community(communityRepository.findByNo(postDto.getCommunityNo()))
                .user(userRepository.findByNo(postDto.getUserNo()).orElse(null))
                .build();

        post = postRepository.save(post);
        return true;
    }

    @Override
    public List<Post> getPostList(long communityNo) {
        List<Post> postList = postRepository.findByCommunityNo(communityNo);
        return postList;
    }

    @Override
    public Post getPost(long postNo) {
        Post post = postRepository.findByNo(postNo);
        return post;
    }

}
