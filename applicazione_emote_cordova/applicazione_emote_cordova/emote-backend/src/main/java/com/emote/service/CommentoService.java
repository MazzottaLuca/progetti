package com.emote.service;

import com.emote.dto.CommentoDto;
import com.emote.entity.Commento;
import com.emote.entity.Utente;
import com.emote.repository.CommentoRepository;
import com.emote.repository.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentoService {

    @Autowired
    private CommentoRepository commentoRepository;

    @Autowired
    private UtenteRepository utenteRepository;

    public List<CommentoDto> getTuttiCommenti() {
        return commentoRepository.findAllPrincipali()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public CommentoDto creaCommento(String testo, Long utenteId) {
        Utente utente = utenteRepository.findById(utenteId)
                .orElseThrow(() -> new IllegalArgumentException("Utente non trovato."));

        Commento commento = new Commento();
        commento.setUtente(utente);
        commento.setTestoCommento(testo);

        Commento salvato = commentoRepository.save(commento);
        return toDto(salvato);
    }

    private CommentoDto toDto(Commento c) {
        CommentoDto dto = new CommentoDto();
        dto.setId(c.getId());
        dto.setUtenteId(c.getUtente().getId());
        dto.setNomeUtente(c.getUtente().getNomeUtente());
        dto.setTestoCommento(c.getTestoCommento());
        dto.setCommentoPadreId(c.getCommentoPadreId());
        dto.setCreatoIl(c.getCreatoIl());
        return dto;
    }
}
