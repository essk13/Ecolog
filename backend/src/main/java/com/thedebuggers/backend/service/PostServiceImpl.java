package com.thedebuggers.backend.service;

import com.thedebuggers.backend.common.exception.CustomException;
import com.thedebuggers.backend.common.util.ErrorCode;
import com.thedebuggers.backend.domain.entity.*;
import com.thedebuggers.backend.domain.repository.*;
import com.thedebuggers.backend.dto.PostReqDto;
import com.thedebuggers.backend.dto.PostResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CommunityRepository communityRepository;
    private final PostLikeRepository postLikeRepository;
    private final UserCommunityRepository userCommunityRepository;

    private final S3Service s3Service;

    @Override
    public PostResDto registPost(User user, PostReqDto postReqDto, long communityNo, MultipartFile imageFile) {
        if (userCommunityRepository.findAllByCommunityNoAndUserNo(communityNo, user.getNo()) == null)
            throw new CustomException(ErrorCode.CONTENT_UNAUTHORIZED);

        if (postReqDto.getTitle() == null || postReqDto.getContent() == null)
            throw new CustomException(ErrorCode.CONTENT_NOT_FILLED);

        String imageUrl = null;
        if (imageFile != null) {
            imageUrl = s3Service.upload(imageFile);
        }

        Post post = Post.builder()
                .title(postReqDto.getTitle())
                .content(postReqDto.getContent())
                .image(imageUrl)
                .createdAt(LocalDateTime.now())
                .isOpen(postReqDto.isOpen())
                .type(postReqDto.getType() != null ? postReqDto.getType() : PostType.FREE.getValue())
                .community(communityRepository.findByNo(communityNo))
                .user(user)
                .build();

        post = postRepository.save(post);
        PostResDto postResDto = PostResDto.of(post);
        return postResDto;
    }

    @Override
    public List<PostResDto> getAllPost() {
        List<PostResDto> postResDtoList = postRepository.findAllByTypeAndIsOpenTrue(PostType.CAMPAIGN.getValue()).stream().map(PostResDto::of).collect(Collectors.toList());
        return postResDtoList;
    }

    @Override
    public List<PostResDto> getPostList(long communityNo, String type) {
        int typeNum = -1;
        switch (type) {
            case "notice":
                typeNum = PostType.NOTICE.getValue();
                break;
            case "free":
                typeNum = PostType.FREE.getValue();
                break;
            case "campaign":
                typeNum = PostType.CAMPAIGN.getValue();
                break;
            default:
                throw new CustomException(ErrorCode.BAD_REQUEST);
        }

        List<PostResDto> postResDtoList = postRepository.findAllByCommunityNoAndType(communityNo, typeNum).stream().map(PostResDto::of).collect(Collectors.toList());
        return postResDtoList;
    }

    @Override
    public List<PostResDto> getMyPostList(long userNo) {
        return postRepository.findAllByUserNoAndIsOpenTrue(userNo).stream().map(PostResDto::of).collect(Collectors.toList());
    }
    @Override
    public List<PostResDto> getMyPostListInCommunity(long communityNo, long userNo) {
        return postRepository.findAllByCommunityNoAndUserNo(communityNo, userNo).stream().map(PostResDto::of).collect(Collectors.toList());
    }

    @Override
    public PostResDto getPost(long userNo, long postNo) {
        Post post = postRepository.findById(postNo).orElseThrow(() -> new CustomException(ErrorCode.CONTENT_NOT_FOUND));
        if (!post.isOpen() && userCommunityRepository.findAllByCommunityNoAndUserNo(post.getCommunity().getNo(), userNo) == null) {
            throw new CustomException(ErrorCode.CONTENT_UNAUTHORIZED);
        }

        boolean isLiked = false;
        if (postLikeRepository.existsByPostNoAndUserNo(postNo, userNo)) {
            isLiked = true;
        }

        return PostResDto.of(post, isLiked);
    }

    @Override
    public boolean modifyPost(long userNo, long postNo, PostReqDto postReqDto, MultipartFile imageFile) {
        Post post = postRepository.findById(postNo).orElseThrow(() -> new CustomException(ErrorCode.CONTENT_NOT_FOUND));
        if (userNo != post.getUser().getNo())
            throw new CustomException(ErrorCode.CONTENT_UNAUTHORIZED);

        String imageUrl = null;

        if (imageFile != null) {
            imageUrl = s3Service.upload(imageFile);
        }

        if (postReqDto.getTitle() != null)
            post.setTitle(postReqDto.getTitle());

        if (postReqDto.getContent() != null)
            post.setContent(postReqDto.getContent());

        post.setImage(imageUrl);
        post.setOpen(postReqDto.isOpen());

        if (postReqDto.getType() != null)
            post.setType(postReqDto.getType());

        postRepository.save(post);
        return true;
    }

    @Override
    public boolean deletePost(long userNo, long postNo) {
        Post post = postRepository.findById(postNo).orElseThrow(() -> new CustomException(ErrorCode.CONTENT_NOT_FOUND));
        if (userNo != post.getUser().getNo())
            throw new CustomException(ErrorCode.CONTENT_UNAUTHORIZED);

        postRepository.deleteById(postNo);
        return true;
    }

    @Override
    @Transactional
    public boolean likePost(long userNo, long postNo) {
        boolean isLiked = postLikeRepository.existsByPostNoAndUserNo(postNo, userNo);

        if (!isLiked) {
            PostLike like = PostLike.builder()
                    .post(postRepository.findById(postNo).orElseThrow(() -> new CustomException(ErrorCode.CONTENT_NOT_FOUND)))
                    .user(userRepository.findByNo(userNo).orElseThrow(() -> new CustomException(ErrorCode.BAD_REQUEST)))
                    .build();

            postLikeRepository.save(like);
            postRepository.updateLike(postNo, 1);
        }
        else {
            postLikeRepository.deleteByPostNoAndUserNo(postNo, userNo);
            postRepository.updateLike(postNo, -1);
        }
        return true;
    }
}
