package com.example.noleggiospring.controller;

import com.example.noleggiospring.model.Auto;
import com.example.noleggiospring.model.Cliente;
import com.example.noleggiospring.model.Noleggio;
import com.example.noleggiospring.service.AutoService;
import com.example.noleggiospring.service.ClienteService;
import com.example.noleggiospring.service.NoleggioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/noleggi")
@RequiredArgsConstructor
public class NoleggioController {

    private final NoleggioService noleggioService;
    private final AutoService autoService;
    private final ClienteService clienteService;

    @GetMapping
    public String lista(@RequestParam(required = false) String stato, Model model) {
        if (stato != null && !stato.isBlank()) {
            model.addAttribute("listaNoleggi", noleggioService.trovaPerStato(stato));
            model.addAttribute("statoFiltro", stato);
        } else {
            model.addAttribute("listaNoleggi", noleggioService.trovaTutti());
        }
        return "noleggi/lista";
    }

    @GetMapping("/nuovo")
    public String nuovoForm(@RequestParam(required = false) Long autoId, Model model) {
        Noleggio noleggio = new Noleggio();

        if (autoId != null) {
            Auto auto = autoService.trovaPerId(autoId).orElse(null);
            if (auto != null) {
                noleggio.setAuto(auto);
            }
        }

        model.addAttribute("noleggio", noleggio);
        model.addAttribute("listaAuto", autoService.trovaDisponibili());
        model.addAttribute("listaClienti", clienteService.trovaTutti());
        return "noleggi/form";
    }

    @PostMapping("/salva")
    public String salva(@RequestParam Long autoId,
                        @RequestParam Long clienteId,
                        @RequestParam @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) java.time.LocalDate dataInizio,
                        @RequestParam @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) java.time.LocalDate dataFine,
                        RedirectAttributes redirectAttributes) {
        Auto auto = autoService.trovaPerId(autoId)
                .orElseThrow(() -> new RuntimeException("Auto non trovata"));
        Cliente cliente = clienteService.trovaPerId(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente non trovato"));

        Noleggio noleggio = new Noleggio();
        noleggio.setAuto(auto);
        noleggio.setCliente(cliente);
        noleggio.setDataInizio(dataInizio);
        noleggio.setDataFine(dataFine);

        noleggioService.creaNuovoNoleggio(noleggio);
        redirectAttributes.addFlashAttribute("messaggio", "Noleggio creato con successo!");
        return "redirect:/noleggi";
    }

    @PostMapping("/{id}/completa")
    public String completa(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        noleggioService.completaNoleggio(id);
        redirectAttributes.addFlashAttribute("messaggio", "Noleggio completato con successo!");
        return "redirect:/noleggi";
    }

    @PostMapping("/{id}/annulla")
    public String annulla(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        noleggioService.annullaNoleggio(id);
        redirectAttributes.addFlashAttribute("messaggio", "Noleggio annullato.");
        return "redirect:/noleggi";
    }
}
