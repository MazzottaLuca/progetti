package com.emote.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentoDto {
    private Long id;
    private Long utenteId;
    private String nomeUtente;
    private String testoCommento;
    private Long commentoPadreId;
    private LocalDateTime creatoIl;
}
