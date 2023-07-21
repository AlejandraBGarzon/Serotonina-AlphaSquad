package com.example.serotonina.Service;

import com.example.serotonina.Entity.Carrito;
import com.example.serotonina.Entity.Servicio;

import java.util.Optional;

public interface CarritoService {
    Carrito agregarServicioAlCarrito(Optional<Carrito> carritoOptional, Servicio servicio);
    Long calcularTotalCarrito(Carrito carrito); // Cambiado a Long
    Optional<Carrito> obtenerCarritoPorId(Long id);
}
