package com.emote.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {

    @NotBlank(message = "Il nome utente è obbligatorio")
    private String nomeUtente;

    @NotBlank(message = "La password è obbligatoria")
    private String password;
}
