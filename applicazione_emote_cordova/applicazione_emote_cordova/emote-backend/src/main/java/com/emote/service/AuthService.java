package com.emote.service;

import com.emote.dto.AuthResponse;
import com.emote.dto.LoginRequest;
import com.emote.dto.RegisterRequest;
import com.emote.entity.Utente;
import com.emote.repository.UtenteRepository;
import com.emote.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UtenteRepository utenteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse registra(RegisterRequest request) {
        if (utenteRepository.existsByNomeUtente(request.getNomeUtente())) {
            throw new IllegalArgumentException("Nome utente già in uso.");
        }
        if (utenteRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email già registrata.");
        }

        Utente utente = new Utente();
        utente.setNomeUtente(request.getNomeUtente());
        utente.setEmail(request.getEmail());
        // BCrypt: compatibile con password_hash() di PHP
        utente.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        Utente salvato = utenteRepository.save(utente);
        String token = jwtUtil.generateToken(salvato.getNomeUtente(), salvato.getId());
        return new AuthResponse(token, salvato.getId(), salvato.getNomeUtente());
    }

    public AuthResponse login(LoginRequest request) {
        Utente utente = utenteRepository.findByNomeUtente(request.getNomeUtente())
                .orElseThrow(() -> new IllegalArgumentException("Credenziali non valide."));

        if (!passwordEncoder.matches(request.getPassword(), utente.getPasswordHash())) {
            throw new IllegalArgumentException("Credenziali non valide.");
        }

        String token = jwtUtil.generateToken(utente.getNomeUtente(), utente.getId());
        return new AuthResponse(token, utente.getId(), utente.getNomeUtente());
    }
}
