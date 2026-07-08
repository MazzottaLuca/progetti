package com.emote.service;

import com.emote.dto.ReazioneDto;
import com.emote.dto.ReazioneRequest;
import com.emote.entity.Commento;
import com.emote.entity.Reazione;
import com.emote.entity.Utente;
import com.emote.repository.CommentoRepository;
import com.emote.repository.ReazioneRepository;
import com.emote.repository.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReazioneService {

    @Autowired
    private ReazioneRepository reazioneRepository;

    @Autowired
    private CommentoRepository commentoRepository;

    @Autowired
    private UtenteRepository utenteRepository;

    @Autowired
    private HuggingFaceService huggingFaceService;

    /**
     * Flusso completo:
     * 1. Recupera il commento originale dal DB
     * 2. Chiama HuggingFace con testo + emote → ottieni commento generato
     * 3. Salva la reazione nel DB
     * 4. Restituisce il DTO con la risposta generata
     */
    public ReazioneDto reagisci(ReazioneRequest request, Long utenteId) {
        Commento commento = commentoRepository.findById(request.getCommentoId())
                .orElseThrow(() -> new IllegalArgumentException("Commento non trovato."));

        Utente utente = utenteRepository.findById(utenteId)
                .orElseThrow(() -> new IllegalArgumentException("Utente non trovato."));

        // Chiamata a HuggingFace — la chiave API è nascosta nel backend
        String rispostaAI = huggingFaceService.generaCommento(
                commento.getTestoCommento(),
                request.getEmote()
        );

        Reazione reazione = new Reazione();
        reazione.setUtente(utente);
        reazione.setCommento(commento);
        reazione.setEmote(request.getEmote());
        reazione.setRispostaGenerata(rispostaAI);
        reazione.setModelloUsato(huggingFaceService.getModel());

        Reazione salvata = reazioneRepository.save(reazione);
        return toDto(salvata);
    }

    public List<ReazioneDto> getReazioniCommento(Long commentoId) {
        return reazioneRepository.findByCommentoId(commentoId)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private ReazioneDto toDto(Reazione r) {
        ReazioneDto dto = new ReazioneDto();
        dto.setId(r.getId());
        dto.setCommentoId(r.getCommento().getId());
        dto.setUtenteId(r.getUtente().getId());
        dto.setNomeUtente(r.getUtente().getNomeUtente());
        dto.setEmote(r.getEmote());
        dto.setRispostaGenerata(r.getRispostaGenerata());
        dto.setModelloUsato(r.getModelloUsato());
        dto.setCreatoIl(r.getCreatoIl());
        return dto;
    }
}
