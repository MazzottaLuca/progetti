package com.example.progetto_parking_system.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.progetto_parking_system.model.ExtraService;
import com.example.progetto_parking_system.repository.ExtraServiceRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ExtraServiceService {

    @Autowired
    private ExtraServiceRepository repository;

    public List<ExtraService> findAll() {
        return repository.findAll();
    }

    public Optional<ExtraService> findById(Long id) {
        return repository.findById(id);
    }

    public ExtraService save(ExtraService entity) {
        return repository.save(entity);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
