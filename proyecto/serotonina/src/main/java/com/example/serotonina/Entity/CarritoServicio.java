package com.example.serotonina.Entity;

import jakarta.persistence.*;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

import javax.persistence.*;

@Entity
@Table(name = "carrito_servicios")
public class CarritoServicio {

    @EmbeddedId
    private CarritoServicioId id;

    @ManyToOne
    @MapsId("carritoId")
    @JoinColumn(name = "carrito_id_car")
    private Carrito carrito;

    @ManyToOne
    @MapsId("servicioId")
    @JoinColumn(name = "servicios_id_serv")
    private Servicio servicio;

    // Constructor vacío (obligatorio para JPA)
    public CarritoServicio() {
    }

    // Constructor con parámetros
    public CarritoServicio(Carrito carrito, Servicio servicio) {
        this.carrito = carrito;
        this.servicio = servicio;
        this.id = new CarritoServicioId(carrito.getId(), servicio.getId());
    }

    // Getters y setters

    public CarritoServicioId getId() {
        return id;
    }

    public void setId(CarritoServicioId id) {
        this.id = id;
    }

    public Carrito getCarrito() {
        return carrito;
    }

    public void setCarrito(Carrito carrito) {
        this.carrito = carrito;
    }

    public Servicio getServicio() {
        return servicio;
    }

    public void setServicio(Servicio servicio) {
        this.servicio = servicio;
    }

    // toString (opcional, útil para depuración)

    @Override
    public String toString() {
        return "CarritoServicio{" +
                "id=" + id +
                ", carrito=" + carrito.getId() +
                ", servicio=" + servicio.getId() +
                '}';
    }
}

