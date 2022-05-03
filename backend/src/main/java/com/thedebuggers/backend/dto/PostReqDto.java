package com.thedebuggers.backend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PostReqDto {
    private String title;
    private String content;
    private String image;
    private boolean isOpen;
}
