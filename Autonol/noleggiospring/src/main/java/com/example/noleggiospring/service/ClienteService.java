package com.example.noleggiospring.service;

import com.example.noleggiospring.model.Cliente;
import com.example.noleggiospring.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public List<Cliente> trovaTutti() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> trovaPerId(Long id) {
        return clienteRepository.findById(id);
    }

    public Optional<Cliente> trovaPerEmail(String email) {
        return clienteRepository.findByEmail(email);
    }

    public Cliente salva(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public void elimina(Long id) {
        clienteRepository.deleteById(id);
    }

    public long contaTotale() {
        return clienteRepository.count();
    }
}
