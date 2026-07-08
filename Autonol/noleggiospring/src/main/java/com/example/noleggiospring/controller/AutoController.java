package com.example.noleggiospring.controller;

import com.example.noleggiospring.model.Auto;
import com.example.noleggiospring.service.AutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
@RequestMapping("/auto")
@RequiredArgsConstructor
public class AutoController {

    private final AutoService autoService;

    @GetMapping
    public String lista(@RequestParam(required = false) String categoria,
                        @RequestParam(required = false) String ricerca,
                        Model model) {
        List<Auto> auto;

        if (ricerca != null && !ricerca.isBlank()) {
            auto = autoService.cerca(ricerca);
            model.addAttribute("ricercaAttiva", ricerca);
        } else if (categoria != null && !categoria.isBlank()) {
            auto = autoService.trovaPerCategoria(categoria);
            model.addAttribute("categoriaAttiva", categoria);
        } else {
            auto = autoService.trovaTutte();
        }

        model.addAttribute("listaAuto", auto);
        model.addAttribute("categorie", List.of("Utilitaria", "Berlina", "SUV", "Sportiva", "Monovolume", "Furgone"));
        return "auto/lista";
    }

    @GetMapping("/{id}")
    public String dettaglio(@PathVariable Long id, Model model) {
        Auto auto = autoService.trovaPerId(id)
                .orElseThrow(() -> new RuntimeException("Auto non trovata"));
        model.addAttribute("auto", auto);
        return "auto/dettaglio";
    }

    @GetMapping("/nuovo")
    public String nuovoForm(Model model) {
        model.addAttribute("auto", new Auto());
        model.addAttribute("categorie", List.of("Utilitaria", "Berlina", "SUV", "Sportiva", "Monovolume", "Furgone"));
        model.addAttribute("isModifica", false);
        return "auto/form";
    }

    @GetMapping("/modifica/{id}")
    public String modificaForm(@PathVariable Long id, Model model) {
        Auto auto = autoService.trovaPerId(id)
                .orElseThrow(() -> new RuntimeException("Auto non trovata"));
        model.addAttribute("auto", auto);
        model.addAttribute("categorie", List.of("Utilitaria", "Berlina", "SUV", "Sportiva", "Monovolume", "Furgone"));
        model.addAttribute("isModifica", true);
        return "auto/form";
    }

    @PostMapping("/salva")
    public String salva(@ModelAttribute Auto auto, RedirectAttributes redirectAttributes) {
        if (auto.getDisponibile() == null) {
            auto.setDisponibile(true);
        }
        autoService.salva(auto);
        redirectAttributes.addFlashAttribute("messaggio", "Auto salvata con successo!");
        return "redirect:/auto";
    }

    @PostMapping("/elimina/{id}")
    public String elimina(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        autoService.elimina(id);
        redirectAttributes.addFlashAttribute("messaggio", "Auto eliminata con successo!");
        return "redirect:/auto";
    }
}
