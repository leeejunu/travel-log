package com.travel.log.domain;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@NoArgsConstructor(access = PROTECTED)
public class Image {

    @Id @GeneratedValue(strategy = IDENTITY)
    @Column(name = "image_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "travel_place_id")
    private Place placeId;

    private String url;
}
