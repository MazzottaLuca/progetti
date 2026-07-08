package com.helpdesk.controller;

import com.helpdesk.model.Utente;
import com.helpdesk.service.UtenteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/utenti")
public class UtenteController {

    private final UtenteService utenteService;

    public UtenteController(UtenteService utenteService) {
        this.utenteService = utenteService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Utente u) {
        try {
            Utente saved = utenteService.registerCliente(u.getUsername(), u.getPasswordHash());
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
    String username = body.get("username");
    String password = body.get("password");

    return utenteService.login(username, password)
            .<ResponseEntity<?>>map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.status(401).body("Credenziali non valide"));
}


    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<?> getClienteById(@PathVariable Integer clienteId) {
        return utenteService.getUtenteByClienteId(clienteId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
