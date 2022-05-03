package com.thedebuggers.backend.domain.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long no;

    private String title;
    private String content;
    private String image;
    private LocalDateTime createdAt;
    private boolean isOpen;
    private long likeCount;

    @ManyToOne
    @JoinColumn(name = "community_no")
    private Community community;

    @ManyToOne
    @JoinColumn(name = "user_no")
    private User user;

}
