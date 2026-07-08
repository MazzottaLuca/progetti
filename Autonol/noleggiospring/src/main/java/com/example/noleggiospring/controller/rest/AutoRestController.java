package com.example.noleggiospring.controller.rest;

import com.example.noleggiospring.model.Auto;
import com.example.noleggiospring.service.AutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auto")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AutoRestController {

    private final AutoService autoService;

    @GetMapping
    public ResponseEntity<List<Auto>> getAllAuto(@RequestParam(required = false) String categoria,
                                                 @RequestParam(required = false) String ricerca) {
        List<Auto> auto;
        if (ricerca != null && !ricerca.isBlank()) {
            auto = autoService.cerca(ricerca);
        } else if (categoria != null && !categoria.isBlank()) {
            auto = autoService.trovaPerCategoria(categoria);
        } else {
            auto = autoService.trovaTutte();
        }
        return ResponseEntity.ok(auto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Auto> getAutoById(@PathVariable Long id) {
        return autoService.trovaPerId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/disponibili")
    public ResponseEntity<List<Auto>> getAutoDisponibili() {
        return ResponseEntity.ok(autoService.trovaDisponibili());
    }
}
