package com.example.noleggiospring.service;

import com.example.noleggiospring.model.Auto;
import com.example.noleggiospring.repository.AutoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AutoServiceTest {

    @Mock
    private AutoRepository autoRepository;

    @InjectMocks
    private AutoService autoService;

    private Auto auto1;
    private Auto auto2;

    @BeforeEach
    void setUp() {
        auto1 = Auto.builder()
                .id(1L)
                .marca("Fiat")
                .modello("500")
                .anno(2020)
                .targa("AB123CD")
                .categoria("Utilitaria")
                .prezzoGiornaliero(BigDecimal.valueOf(30.00))
                .disponibile(true)
                .build();

        auto2 = Auto.builder()
                .id(2L)
                .marca("Alfa Romeo")
                .modello("Giulia")
                .anno(2021)
                .targa("EF456GH")
                .categoria("Berlina")
                .prezzoGiornaliero(BigDecimal.valueOf(80.00))
                .disponibile(false)
                .build();
    }

    @Test
    void trovaTutte() {
        when(autoRepository.findAll()).thenReturn(Arrays.asList(auto1, auto2));

        List<Auto> risultato = autoService.trovaTutte();

        assertEquals(2, risultato.size());
        assertEquals("Fiat", risultato.get(0).getMarca());
        verify(autoRepository, times(1)).findAll();
    }

    @Test
    void trovaPerId() {
        when(autoRepository.findById(1L)).thenReturn(Optional.of(auto1));

        Optional<Auto> risultato = autoService.trovaPerId(1L);

        assertTrue(risultato.isPresent());
        assertEquals("Fiat", risultato.get().getMarca());
        verify(autoRepository, times(1)).findById(1L);
    }

    @Test
    void trovaDisponibili() {
        when(autoRepository.findByDisponibile(true)).thenReturn(List.of(auto1));

        List<Auto> risultato = autoService.trovaDisponibili();

        assertEquals(1, risultato.size());
        assertTrue(risultato.get(0).getDisponibile());
        verify(autoRepository, times(1)).findByDisponibile(true);
    }

    @Test
    void salva() {
        when(autoRepository.save(any(Auto.class))).thenReturn(auto1);

        Auto salvata = autoService.salva(auto1);

        assertNotNull(salvata);
        assertEquals("Fiat", salvata.getMarca());
        verify(autoRepository, times(1)).save(auto1);
    }

    @Test
    void elimina() {
        doNothing().when(autoRepository).deleteById(1L);

        autoService.elimina(1L);

        verify(autoRepository, times(1)).deleteById(1L);
    }
}
