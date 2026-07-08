package com.emote.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "utenti")
@Data
@NoArgsConstructor
public class Utente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_utente", nullable = false, unique = true)
    private String nomeUtente;

    @Column(name = "email")
    private String email;

    @Column(name = "password_hash")
    private String passwordHash;

    @Column(name = "creato_il", updatable = false)
    private LocalDateTime creatoIl;

    @PrePersist
    public void prePersist() {
        this.creatoIl = LocalDateTime.now();
    }
}
