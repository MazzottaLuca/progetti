package com.emote.controller;

import com.emote.dto.CommentoDto;
import com.emote.security.UtenteDetails;
import com.emote.service.CommentoService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/commenti")
public class CommentoController {

    @Autowired
    private CommentoService commentoService;

    // GET /api/commenti — lista tutti i commenti principali
    @GetMapping
    public ResponseEntity<List<CommentoDto>> getCommenti() {
        return ResponseEntity.ok(commentoService.getTuttiCommenti());
    }

    // POST /api/commenti — crea un nuovo commento
    @PostMapping
    public ResponseEntity<?> creaCommento(
            @Valid @RequestBody NuovoCommentoRequest request,
            @AuthenticationPrincipal UtenteDetails utenteDetails) {
        try {
            CommentoDto dto = commentoService.creaCommento(
                    request.getTesto(),
                    utenteDetails.getId()
            );
            return ResponseEntity.ok(dto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("errore", e.getMessage()));
        }
    }

    // DTO inline per la richiesta di nuovo commento
    @Data
    public static class NuovoCommentoRequest {
        @NotBlank(message = "Il testo del commento è obbligatorio")
        private String testo;
    }
}
