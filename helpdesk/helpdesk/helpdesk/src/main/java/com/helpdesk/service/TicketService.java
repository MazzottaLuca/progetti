package com.helpdesk.service;

import com.helpdesk.model.Ticket;
import com.helpdesk.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    private final TicketRepository ticketRepo;

    public TicketService(TicketRepository ticketRepo) {
        this.ticketRepo = ticketRepo;
    }

    public List<Ticket> getAllTickets() {
        return ticketRepo.findAll();
    }

    public Optional<Ticket> getTicketById(Integer id) {
        return ticketRepo.findById(id);
    }

    public List<Ticket> getTicketsByUtenteId(Integer utenteId) {
        return ticketRepo.findByUtenteId(utenteId);
    }

    public Ticket createTicket(Ticket t) {
        return ticketRepo.save(t);
    }

    public void deleteTicket(Integer id) {
        ticketRepo.deleteById(id);
    }
}
