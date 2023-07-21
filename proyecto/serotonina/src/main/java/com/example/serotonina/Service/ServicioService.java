package com.example.serotonina.Service;

import com.example.serotonina.Entity.Servicio;

import java.util.List;
import java.util.Optional;

public interface ServicioService {
    List<Servicio> obtenerTodosLosServicios();

    Optional<Servicio> obtenerServicioPorId(Long id);

    Servicio guardarServicio(Servicio servicio);
}
