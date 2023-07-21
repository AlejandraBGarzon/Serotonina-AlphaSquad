package com.example.serotonina.Service;

import com.example.serotonina.Entity.CarritoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.serotonina.Entity.Carrito;
import com.example.serotonina.Entity.Servicio;
import com.example.serotonina.Repository.CarritoRepository;
import com.example.serotonina.Repository.CarritoServicioRepository;
import com.example.serotonina.Repository.ServicioRepository;

import java.util.Optional;

@Service
public class CarritoServiceImpl implements CarritoService {

    private final CarritoRepository carritoRepository;
    private final CarritoServicioRepository carritoServicioRepository;
    private final ServicioRepository servicioRepository;

    @Autowired
    public CarritoServiceImpl(CarritoRepository carritoRepository, CarritoServicioRepository carritoServicioRepository, ServicioRepository servicioRepository) {
        this.carritoRepository = carritoRepository;
        this.carritoServicioRepository = carritoServicioRepository;
        this.servicioRepository = servicioRepository;
    }

    @Override
    @Transactional
    public Carrito agregarServicioAlCarrito(Optional<Carrito> carritoOptional, Servicio servicio) {
        Carrito carrito = carritoOptional.orElse(new Carrito()); // Obtener el Carrito del Optional

        // Verificar si el servicio ya está en el carrito
        boolean servicioEnCarrito = carrito.getCarritoServicios().stream()
                .anyMatch(cs -> cs.getServicio().equals(servicio));

        if (!servicioEnCarrito) {
            CarritoServicio carritoServicio = new CarritoServicio();
            carritoServicio.setCarrito(carrito);
            carritoServicio.setServicio(servicio);
            carritoServicioRepository.save(carritoServicio);
        }

        // Recalcula el total del carrito
        carrito.setTotal(calcularTotalCarrito(carrito));
        return carritoRepository.save(carrito);
    }

    @Override
    public Long calcularTotalCarrito(Carrito carrito) {
        return carrito.getCarritoServicios().stream()
                .mapToLong(cs -> cs.getServicio().getPrecio())
                .sum();
    }

    @Override
    public Optional<Carrito> obtenerCarritoPorId(Long id) {
        return carritoRepository.findById(id);
    }
}
