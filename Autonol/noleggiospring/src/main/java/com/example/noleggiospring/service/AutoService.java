package com.example.noleggiospring.service;

import com.example.noleggiospring.model.Auto;
import com.example.noleggiospring.repository.AutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AutoService {

    private final AutoRepository autoRepository;

    public List<Auto> trovaTutte() {
        return autoRepository.findAll();
    }

    public Optional<Auto> trovaPerId(Long id) {
        return autoRepository.findById(id);
    }

    public List<Auto> trovaDisponibili() {
        return autoRepository.findByDisponibile(true);
    }

    public List<Auto> trovaPerCategoria(String categoria) {
        return autoRepository.findByCategoria(categoria);
    }

    public List<Auto> trovaPerCategoriaDisponibili(String categoria) {
        return autoRepository.findByCategoriaAndDisponibile(categoria, true);
    }

    public List<Auto> cerca(String query) {
        return autoRepository.searchByMarcaOrModello(query);
    }

    public Auto salva(Auto auto) {
        return autoRepository.save(auto);
    }

    public void elimina(Long id) {
        autoRepository.deleteById(id);
    }

    public long contaTotale() {
        return autoRepository.count();
    }

    public long contaDisponibili() {
        return autoRepository.findByDisponibile(true).size();
    }
}
