package com.travel.log.domain;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@NoArgsConstructor(access = PROTECTED)
public class Place {

    @Id @GeneratedValue(strategy = IDENTITY)
    @Column(name = "place_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "travel_id")
    private Travel travelId;

    private Double lat;
    private Double lng;
}
