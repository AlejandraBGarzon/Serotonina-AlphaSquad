package com.example.serotonina.Controller;

import com.example.serotonina.Entity.Carrito;
import com.example.serotonina.Service.CarritoService;
import com.example.serotonina.Service.ServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/carrito")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class CarritoController {

    private final CarritoService carritoService;
    private final ServicioService servicioService; // Agrega la inyección del servicio ServicioService

    @Autowired
    public CarritoController(CarritoService carritoService, ServicioService servicioService) {
        this.carritoService = carritoService;
        this.servicioService = servicioService; // Inyecta el servicio ServicioService
    }

    @PostMapping("/{carritoId}/agregar-servicio/{servicioId}")
    public Carrito agregarServicioAlCarrito(@PathVariable Long carritoId, @PathVariable Long servicioId) {
        Carrito carrito = carritoService.agregarServicioAlCarrito(
                carritoService.obtenerCarritoPorId(carritoId),
                servicioService.obtenerServicioPorId(servicioId).orElse(null)
        );
        return carrito;
    }

    @GetMapping("/{carritoId}")
    public ResponseEntity<Carrito> obtenerCarritoPorId(@PathVariable Long carritoId) {
        Optional<Carrito> carrito = carritoService.obtenerCarritoPorId(carritoId);
        return carrito.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
