package com.thedebuggers.backend.domain.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class UserCampaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long no;

    @ManyToOne
    @JoinColumn(name = "user_no")
    private User user;

    @ManyToOne
    @JoinColumn(name = "campaign_no")
    private Campaign campaign;

}
