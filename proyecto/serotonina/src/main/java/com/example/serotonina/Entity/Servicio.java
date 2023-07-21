package com.example.serotonina.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "servicios")
public class Servicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_serv")
    private Long id;

    @Column(name = "tipo_serv")
    private String tipo;

    @Column(name = "precio_serv")
    private Long precio; // Cambiado a Long

    // Constructor vacío (obligatorio para JPA)
    public Servicio() {
    }

    // Constructor con parámetros
    public Servicio(String tipo, Long precio) { // Cambiado el tipo de dato en el constructor
        this.tipo = tipo;
        this.precio = precio;
    }

    // Getters y setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Long getPrecio() {
        return precio;
    }

    public void setPrecio(Long precio) {
        this.precio = precio;
    }

    // toString (opcional, útil para depuración)

    @Override
    public String toString() {
        return "Servicio{" +
                "id=" + id +
                ", tipo='" + tipo + '\'' +
                ", precio=" + precio +
                '}';
    }
}
