package com.example.noleggiospring.repository;

import com.example.noleggiospring.model.Auto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AutoRepository extends JpaRepository<Auto, Long> {

    List<Auto> findByDisponibile(Boolean disponibile);

    List<Auto> findByCategoria(String categoria);

    List<Auto> findByCategoriaAndDisponibile(String categoria, Boolean disponibile);

    @Query("SELECT a FROM Auto a WHERE LOWER(a.marca) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(a.modello) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Auto> searchByMarcaOrModello(@Param("query") String query);
}
