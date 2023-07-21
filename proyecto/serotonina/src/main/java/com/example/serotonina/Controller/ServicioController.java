package com.example.serotonina.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.example.serotonina.Entity.Servicio;
import com.example.serotonina.Service.ServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/servicios")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class ServicioController {

    private final ServicioService servicioService;
    private final Logger logger = LoggerFactory.getLogger(ServicioController.class);

    @Autowired
    public ServicioController(ServicioService servicioService) {
        this.servicioService = servicioService;
    }

    @GetMapping
    public List<Servicio> obtenerTodosLosServicios() {
        return servicioService.obtenerTodosLosServicios();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Servicio> obtenerServicioPorId(@PathVariable Long id) {
        Optional<Servicio> servicio = servicioService.obtenerServicioPorId(id);
        return servicio.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> guardarServicio(@RequestBody Servicio servicio) {
        logger.debug("Valor de servicio.getPrecio(): {}", servicio.getPrecio());
        // Validación para evitar que el campo 'precio' sea nulo
        if (servicio.getPrecio() == null) {
            return ResponseEntity.badRequest().body("El campo 'precio' no puede ser nulo.");
        }

        Servicio nuevoServicio = servicioService.guardarServicio(servicio);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoServicio);
    }
}
