package com.emote.controller;

import com.emote.dto.ReazioneDto;
import com.emote.dto.ReazioneRequest;
import com.emote.security.UtenteDetails;
import com.emote.service.ReazioneService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reazioni")
public class ReazioneController {

    @Autowired
    private ReazioneService reazioneService;

    /**
     * POST /api/reazioni
     * Body: { "commentoId": 5, "emote": "😂" }
     * Risposta: { "rispostaGenerata": "...", "emote": "😂", ... }
     *
     * Cordova manda solo commentoId + emote.
     * Il backend recupera il testo, chiama HuggingFace (con la chiave nascosta),
     * salva e restituisce la risposta generata.
     */
    @PostMapping
    public ResponseEntity<?> reagisci(
            @Valid @RequestBody ReazioneRequest request,
            @AuthenticationPrincipal UtenteDetails utenteDetails) {
        try {
            ReazioneDto dto = reazioneService.reagisci(request, utenteDetails.getId());
            return ResponseEntity.ok(dto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("errore", e.getMessage()));
        }
    }

    // GET /api/reazioni/{commentoId} — reazioni di un commento specifico
    @GetMapping("/{commentoId}")
    public ResponseEntity<List<ReazioneDto>> getReazioni(@PathVariable Long commentoId) {
        return ResponseEntity.ok(reazioneService.getReazioniCommento(commentoId));
    }
}
