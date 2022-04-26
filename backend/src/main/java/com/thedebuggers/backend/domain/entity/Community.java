package com.thedebuggers.backend.domain.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@Table(name = "COMMUNITY")
public class Community {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "no")
    private long no;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

//    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = User.class)
//    @JoinColumn(name = "no", updatable = false)
//    private User user;

    @Column(name = "manager")
    private long manager;

    @Column(name = "image")
    private String image;


}
