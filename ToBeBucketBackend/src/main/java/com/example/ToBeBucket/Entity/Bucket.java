package com.example.ToBeBucket.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "Bucket")
public class Bucket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bucketId", nullable = false)
    private Long bucketId;

    @Column(name = "userId", length = 255, nullable = false)
    private String userId;

    @Column(name = "mbti", length = 4, nullable = false)
    private String mbti;

    @Column(name = "bucketName", columnDefinition = "LONGTEXT", nullable = false)
    private String bucketName;

    @Column(name = "bucketContent", columnDefinition = "LONGTEXT", nullable = false)
    private String bucketContent;

    @Column(name = "category")
    private Integer category;

    @Column(name = "createDate", nullable = false)
    private String createDate;

    @Column(name = "goalDate")
    private String goalDate;

    @Column(name = "achieveStatus", nullable = false)
    private Boolean achieveStatus = false;

    @Column(name = "publicStatus", nullable = false)
    private Boolean publicStatus = false;

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId", insertable = false, updatable = false)
    private UserLogin userLogin;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "userId", referencedColumnName = "userId", insertable = false, updatable = false),
            @JoinColumn(name = "mbti", referencedColumnName = "mbti", insertable = false, updatable = false)
    })
    private UserProfile userProfile;
}
