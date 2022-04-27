package com.thedebuggers.backend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class PostDto {
    private String title;
    private String content;
    private String image;
    private LocalDateTime createdAt;
    private boolean isOpen;
    private long userNo;
    private long communityNo;
}
