package com.emote.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "reazioni")
@Data
@NoArgsConstructor
public class Reazione {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "utente_id", nullable = false)
    private Utente utente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "commento_id", nullable = false)
    private Commento commento;

    @Column(name = "emote", length = 10)
    private String emote;

    @Column(name = "risposta_generata", columnDefinition = "TEXT")
    private String rispostaGenerata;

    @Column(name = "modello_usato")
    private String modelloUsato;

    @Column(name = "creato_il", updatable = false)
    private LocalDateTime creatoIl;

    @PrePersist
    public void prePersist() {
        this.creatoIl = LocalDateTime.now();
    }
}
