package com.emote.repository;

import com.emote.entity.Reazione;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReazioneRepository extends JpaRepository<Reazione, Long> {
    List<Reazione> findByCommentoId(Long commentoId);
}
