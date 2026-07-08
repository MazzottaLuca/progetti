package com.emote.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReazioneRequest {

    @NotNull(message = "Il commento_id è obbligatorio")
    private Long commentoId;

    @NotBlank(message = "L'emote è obbligatoria")
    private String emote;
}
