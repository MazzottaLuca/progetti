package com.example.noleggiospring.service;

import com.example.noleggiospring.model.Auto;
import com.example.noleggiospring.model.Noleggio;
import com.example.noleggiospring.repository.NoleggioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NoleggioService {

    private final NoleggioRepository noleggioRepository;
    private final AutoService autoService;

    public List<Noleggio> trovaTutti() {
        return noleggioRepository.findAllByOrderByDataInizioDesc();
    }

    public Optional<Noleggio> trovaPerId(Long id) {
        return noleggioRepository.findById(id);
    }

    public List<Noleggio> trovaPerCliente(Long clienteId) {
        return noleggioRepository.findByClienteId(clienteId);
    }

    public List<Noleggio> trovaPerStato(String stato) {
        return noleggioRepository.findByStato(stato);
    }

    @Transactional
    public Noleggio creaNuovoNoleggio(Noleggio noleggio) {
        // Calcola il numero di giorni
        long giorni = ChronoUnit.DAYS.between(noleggio.getDataInizio(), noleggio.getDataFine());
        if (giorni <= 0) {
            giorni = 1;
        }

        // Calcola il prezzo totale
        BigDecimal prezzoGiornaliero = noleggio.getAuto().getPrezzoGiornaliero();
        noleggio.setPrezzoTotale(prezzoGiornaliero.multiply(BigDecimal.valueOf(giorni)));
        noleggio.setStato("ATTIVO");

        // Imposta l'auto come non disponibile
        Auto auto = noleggio.getAuto();
        auto.setDisponibile(false);
        autoService.salva(auto);

        return noleggioRepository.save(noleggio);
    }

    @Transactional
    public Noleggio completaNoleggio(Long id) {
        Noleggio noleggio = noleggioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Noleggio non trovato"));
        noleggio.setStato("COMPLETATO");

        // Rimetti l'auto come disponibile
        Auto auto = noleggio.getAuto();
        auto.setDisponibile(true);
        autoService.salva(auto);

        return noleggioRepository.save(noleggio);
    }

    @Transactional
    public Noleggio annullaNoleggio(Long id) {
        Noleggio noleggio = noleggioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Noleggio non trovato"));
        noleggio.setStato("ANNULLATO");

        // Rimetti l'auto come disponibile
        Auto auto = noleggio.getAuto();
        auto.setDisponibile(true);
        autoService.salva(auto);

        return noleggioRepository.save(noleggio);
    }

    public long contaTotale() {
        return noleggioRepository.count();
    }

    public long contaAttivi() {
        return noleggioRepository.findByStato("ATTIVO").size();
    }
}
