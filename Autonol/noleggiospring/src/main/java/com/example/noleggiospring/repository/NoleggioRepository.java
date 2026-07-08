package com.example.noleggiospring.repository;

import com.example.noleggiospring.model.Noleggio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NoleggioRepository extends JpaRepository<Noleggio, Long> {

    List<Noleggio> findByClienteId(Long clienteId);

    List<Noleggio> findByAutoId(Long autoId);

    List<Noleggio> findByStato(String stato);

    List<Noleggio> findAllByOrderByDataInizioDesc();
}
