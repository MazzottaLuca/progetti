package com.emote.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReazioneDto {
    private Long id;
    private Long commentoId;
    private Long utenteId;
    private String nomeUtente;
    private String emote;
    private String rispostaGenerata;
    private String modelloUsato;
    private LocalDateTime creatoIl;
}
