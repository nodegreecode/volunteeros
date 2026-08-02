package de.upteams.volunteeros.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String publicId;

    private String url;

    private String originalFilename;

    private String contentType;

    private Long size;

    private Instant uploadedAt;

}
