package com.example.serotonina.Entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class CarritoServicioId implements Serializable {

    @Column(name = "carrito_id_car")
    private Long carritoId;

    @Column(name = "servicios_id_serv")
    private Long servicioId;

    // Constructor vacío (obligatorio para JPA)
    public CarritoServicioId() {
    }

    // Constructor con parámetros
    public CarritoServicioId(Long carritoId, Long servicioId) {
        this.carritoId = carritoId;
        this.servicioId = servicioId;
    }

    // Getters y setters

    public Long getCarritoId() {
        return carritoId;
    }

    public void setCarritoId(Long carritoId) {
        this.carritoId = carritoId;
    }

    public Long getServicioId() {
        return servicioId;
    }

    public void setServicioId(Long servicioId) {
        this.servicioId = servicioId;
    }

    // hashCode y equals (obligatorios para clave primaria compuesta)

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((carritoId == null) ? 0 : carritoId.hashCode());
        result = prime * result + ((servicioId == null) ? 0 : servicioId.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        CarritoServicioId other = (CarritoServicioId) obj;
        if (carritoId == null) {
            if (other.carritoId != null)
                return false;
        } else if (!carritoId.equals(other.carritoId))
            return false;
        if (servicioId == null) {
            if (other.servicioId != null)
                return false;
        } else if (!servicioId.equals(other.servicioId))
            return false;
        return true;
    }

    // toString (opcional, útil para depuración)

    @Override
    public String toString() {
        return "CarritoServicioId [carritoId=" + carritoId + ", servicioId=" + servicioId + "]";
    }
}

