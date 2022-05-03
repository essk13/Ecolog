package com.thedebuggers.backend.domain.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long no;

    private String title;
    private String content;
    private String image;
    private String location;

    private LocalDateTime start_date;
    private LocalDateTime end_date;

    private long max_personnel;

    @ManyToOne
    @JoinColumn(name = "community_no")
    private Community community;

    @ManyToOne
    @JoinColumn(name = "user_no")
    private User user;
}
