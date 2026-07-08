package com.emote.repository;

import com.emote.entity.Utente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UtenteRepository extends JpaRepository<Utente, Long> {
    Optional<Utente> findByNomeUtente(String nomeUtente);
    Optional<Utente> findByEmail(String email);
    boolean existsByNomeUtente(String nomeUtente);
    boolean existsByEmail(String email);
}
