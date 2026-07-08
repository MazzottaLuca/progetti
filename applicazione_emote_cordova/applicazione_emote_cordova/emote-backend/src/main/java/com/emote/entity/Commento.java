package com.emote.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "commenti")
@Data
@NoArgsConstructor
public class Commento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "utente_id", nullable = false)
    private Utente utente;

    @Column(name = "testo_commento", nullable = false, columnDefinition = "TEXT")
    private String testoCommento;

    @Column(name = "commento_padre_id")
    private Long commentoPadreId;

    @Column(name = "creato_il", updatable = false)
    private LocalDateTime creatoIl;

    @PrePersist
    public void prePersist() {
        this.creatoIl = LocalDateTime.now();
    }
}
