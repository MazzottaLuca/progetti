package com.example.noleggiospring.service;

import com.example.noleggiospring.model.Auto;
import com.example.noleggiospring.model.Cliente;
import com.example.noleggiospring.model.Noleggio;
import com.example.noleggiospring.repository.NoleggioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class NoleggioServiceTest {

    @Mock
    private NoleggioRepository noleggioRepository;

    @Mock
    private AutoService autoService;

    @InjectMocks
    private NoleggioService noleggioService;

    private Auto auto;
    private Cliente cliente;
    private Noleggio noleggio;

    @BeforeEach
    void setUp() {
        auto = Auto.builder()
                .id(1L)
                .marca("Fiat")
                .modello("500")
                .anno(2020)
                .targa("AB123CD")
                .categoria("Utilitaria")
                .prezzoGiornaliero(BigDecimal.valueOf(30.00))
                .disponibile(true)
                .build();

        cliente = Cliente.builder()
                .id(1L)
                .nome("Mario")
                .cognome("Rossi")
                .email("mario.rossi@example.com")
                .codiceFiscale("RSSMRA80A01H501U")
                .build();

        noleggio = Noleggio.builder()
                .id(1L)
                .auto(auto)
                .cliente(cliente)
                .dataInizio(LocalDate.now())
                .dataFine(LocalDate.now().plusDays(3))
                .stato("ATTIVO")
                .build();
    }

    @Test
    void creaNuovoNoleggio() {
        when(noleggioRepository.save(any(Noleggio.class))).thenReturn(noleggio);
        when(autoService.salva(any(Auto.class))).thenReturn(auto);

        Noleggio creato = noleggioService.creaNuovoNoleggio(noleggio);

        assertNotNull(creato);
        assertEquals(BigDecimal.valueOf(90.00), creato.getPrezzoTotale());
        assertEquals("ATTIVO", creato.getStato());
        assertFalse(auto.getDisponibile());
        verify(autoService, times(1)).salva(auto);
        verify(noleggioRepository, times(1)).save(noleggio);
    }

    @Test
    void completaNoleggio() {
        when(noleggioRepository.findById(1L)).thenReturn(Optional.of(noleggio));
        when(noleggioRepository.save(any(Noleggio.class))).thenReturn(noleggio);
        when(autoService.salva(any(Auto.class))).thenReturn(auto);

        Noleggio completato = noleggioService.completaNoleggio(1L);

        assertEquals("COMPLETATO", completato.getStato());
        assertTrue(auto.getDisponibile());
        verify(autoService, times(1)).salva(auto);
        verify(noleggioRepository, times(1)).save(noleggio);
    }

    @Test
    void annullaNoleggio() {
        when(noleggioRepository.findById(1L)).thenReturn(Optional.of(noleggio));
        when(noleggioRepository.save(any(Noleggio.class))).thenReturn(noleggio);
        when(autoService.salva(any(Auto.class))).thenReturn(auto);

        Noleggio annullato = noleggioService.annullaNoleggio(1L);

        assertEquals("ANNULLATO", annullato.getStato());
        assertTrue(auto.getDisponibile());
        verify(autoService, times(1)).salva(auto);
        verify(noleggioRepository, times(1)).save(noleggio);
    }
}
