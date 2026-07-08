package com.example.noleggiospring.controller;

import com.example.noleggiospring.service.AutoService;
import com.example.noleggiospring.service.ClienteService;
import com.example.noleggiospring.service.NoleggioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class HomeController {

    private final AutoService autoService;
    private final ClienteService clienteService;
    private final NoleggioService noleggioService;

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("autoDisponibili", autoService.trovaDisponibili());
        model.addAttribute("totaleAuto", autoService.contaTotale());
        model.addAttribute("autoDisponibiliCount", autoService.contaDisponibili());
        model.addAttribute("totaleClienti", clienteService.contaTotale());
        model.addAttribute("totaleNoleggi", noleggioService.contaTotale());
        model.addAttribute("noleggiAttivi", noleggioService.contaAttivi());
        return "index";
    }
}
