package com.example.serotonina.Service;

import com.example.serotonina.Entity.Servicio;
import com.example.serotonina.Repository.ServicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioServiceImpl implements ServicioService {

    private final ServicioRepository servicioRepository;

    @Autowired
    public ServicioServiceImpl(ServicioRepository servicioRepository) {
        this.servicioRepository = servicioRepository;
    }

    @Override
    public List<Servicio> obtenerTodosLosServicios() {
        return servicioRepository.findAll();
    }

    @Override
    public Optional<Servicio> obtenerServicioPorId(Long id) {
        return servicioRepository.findById(id);
    }

    @Override
    public Servicio guardarServicio(Servicio servicio) {
        return servicioRepository.save(servicio);
    }
}
