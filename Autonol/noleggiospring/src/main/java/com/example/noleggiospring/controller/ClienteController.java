package com.example.noleggiospring.controller;

import com.example.noleggiospring.model.Cliente;
import com.example.noleggiospring.service.ClienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/clienti")
@RequiredArgsConstructor
public class ClienteController {

    private final ClienteService clienteService;

    @GetMapping
    public String lista(Model model) {
        model.addAttribute("listaClienti", clienteService.trovaTutti());
        return "clienti/lista";
    }

    @GetMapping("/nuovo")
    public String nuovoForm(Model model) {
        model.addAttribute("cliente", new Cliente());
        model.addAttribute("isModifica", false);
        return "clienti/form";
    }

    @GetMapping("/modifica/{id}")
    public String modificaForm(@PathVariable Long id, Model model) {
        Cliente cliente = clienteService.trovaPerId(id)
                .orElseThrow(() -> new RuntimeException("Cliente non trovato"));
        model.addAttribute("cliente", cliente);
        model.addAttribute("isModifica", true);
        return "clienti/form";
    }

    @PostMapping("/salva")
    public String salva(@ModelAttribute Cliente cliente, RedirectAttributes redirectAttributes) {
        clienteService.salva(cliente);
        redirectAttributes.addFlashAttribute("messaggio", "Cliente salvato con successo!");
        return "redirect:/clienti";
    }

    @PostMapping("/elimina/{id}")
    public String elimina(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        clienteService.elimina(id);
        redirectAttributes.addFlashAttribute("messaggio", "Cliente eliminato con successo!");
        return "redirect:/clienti";
    }
}
