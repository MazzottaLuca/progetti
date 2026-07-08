package com.emote.repository;

import com.emote.entity.Commento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentoRepository extends JpaRepository<Commento, Long> {

    // Tutti i commenti principali (senza padre) ordinati per data decrescente
    @Query("SELECT c FROM Commento c JOIN FETCH c.utente WHERE c.commentoPadreId IS NULL ORDER BY c.creatoIl DESC")
List<Commento> findAllPrincipali();
}
