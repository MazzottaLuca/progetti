package com.example.noleggiospring.service;

import com.example.noleggiospring.model.Cliente;
import com.example.noleggiospring.repository.ClienteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ClienteServiceTest {

    @Mock
    private ClienteRepository clienteRepository;

    @InjectMocks
    private ClienteService clienteService;

    private Cliente cliente1;
    private Cliente cliente2;

    @BeforeEach
    void setUp() {
        cliente1 = Cliente.builder()
                .id(1L)
                .nome("Mario")
                .cognome("Rossi")
                .email("mario.rossi@example.com")
                .telefono("3331234567")
                .codiceFiscale("RSSMRA80A01H501U")
                .indirizzo("Via Roma 1, Milano")
                .dataRegistrazione(LocalDate.now())
                .build();

        cliente2 = Cliente.builder()
                .id(2L)
                .nome("Luigi")
                .cognome("Verdi")
                .email("luigi.verdi@example.com")
                .telefono("3337654321")
                .codiceFiscale("VRDLGU85M02F205Z")
                .indirizzo("Via Torino 10, Roma")
                .dataRegistrazione(LocalDate.now())
                .build();
    }

    @Test
    void trovaTutti() {
        when(clienteRepository.findAll()).thenReturn(Arrays.asList(cliente1, cliente2));

        List<Cliente> risultato = clienteService.trovaTutti();

        assertEquals(2, risultato.size());
        assertEquals("Mario", risultato.get(0).getNome());
        verify(clienteRepository, times(1)).findAll();
    }

    @Test
    void trovaPerId() {
        when(clienteRepository.findById(1L)).thenReturn(Optional.of(cliente1));

        Optional<Cliente> risultato = clienteService.trovaPerId(1L);

        assertTrue(risultato.isPresent());
        assertEquals("Rossi", risultato.get().getCognome());
        verify(clienteRepository, times(1)).findById(1L);
    }

    @Test
    void salva() {
        when(clienteRepository.save(any(Cliente.class))).thenReturn(cliente1);

        Cliente salvato = clienteService.salva(cliente1);

        assertNotNull(salvato);
        assertEquals("Mario", salvato.getNome());
        verify(clienteRepository, times(1)).save(cliente1);
    }

    @Test
    void elimina() {
        doNothing().when(clienteRepository).deleteById(1L);

        clienteService.elimina(1L);

        verify(clienteRepository, times(1)).deleteById(1L);
    }
}
