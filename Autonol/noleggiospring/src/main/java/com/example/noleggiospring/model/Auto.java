package com.example.noleggiospring.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "auto")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Auto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String marca;

    @Column(nullable = false, length = 100)
    private String modello;

    @Column(nullable = false)
    private Integer anno;

    @Column(nullable = false, unique = true, length = 10)
    private String targa;

    @Column(nullable = false, length = 50)
    private String categoria;

    @Column(name = "prezzo_giornaliero", nullable = false, precision = 10, scale = 2)
    private BigDecimal prezzoGiornaliero;

    @Column(nullable = false)
    private Boolean disponibile = true;

    @Column(name = "immagine_url", length = 500)
    private String immagineUrl;

    @Column(columnDefinition = "TEXT")
    private String descrizione;
}
