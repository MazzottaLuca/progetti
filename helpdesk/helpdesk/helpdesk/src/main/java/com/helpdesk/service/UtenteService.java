package com.helpdesk.service;

import com.helpdesk.model.Utente;
import com.helpdesk.model.Cliente;
import com.helpdesk.repository.UtenteRepository;
import com.helpdesk.repository.ClienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UtenteService {

    private final UtenteRepository utenteRepo;
    private final ClienteRepository clienteRepo;

    public UtenteService(UtenteRepository utenteRepo, ClienteRepository clienteRepo) {
        this.utenteRepo = utenteRepo;
        this.clienteRepo = clienteRepo;
    }

    @Transactional
    public Utente registerCliente(String username, String passwordHash) {
        if (utenteRepo.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username già esistente");
        }

        Cliente c = new Cliente(username);
        Cliente savedCliente = clienteRepo.save(c);

        Utente u = new Utente();
        u.setUsername(username);
        u.setPasswordHash(passwordHash);
        u.setRuolo("cliente");
        u.setClienteId(savedCliente.getId());

        return utenteRepo.save(u);
    }

    public Optional<Utente> login(String username, String passwordHash) {
        return utenteRepo.findByUsername(username)
                .filter(u -> u.getPasswordHash().equals(passwordHash) && "cliente".equals(u.getRuolo()));
    }

    public Optional<Utente> getUtenteByClienteId(Integer clienteId) {
        return utenteRepo.findByClienteId(clienteId);
    }
}
