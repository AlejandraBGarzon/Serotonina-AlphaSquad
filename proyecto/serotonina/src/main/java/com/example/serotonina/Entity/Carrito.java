package com.example.serotonina.Entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "carrito")
public class Carrito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_car")
    private Long id;

    @Column(name = "total_car")
    private Long total;

    @ManyToOne
    @JoinColumn(name = "usuarios_id_usu")
    private Usuario usuario; // Agrega la entidad Usuario si aún no la tienes

    @OneToMany(mappedBy = "carrito", cascade = CascadeType.ALL)
    private List<CarritoServicio> carritoServicios = new ArrayList<>();

    // Constructor vacío (obligatorio para JPA)
    public Carrito() {
    }

    // Constructor con parámetros
    public Carrito(Long total, Usuario usuario) {
        this.total = total;
        this.usuario = usuario;
    }

    // Getters y setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public List<CarritoServicio> getCarritoServicios() {
        return carritoServicios;
    }

    public void setCarritoServicios(List<CarritoServicio> carritoServicios) {
        this.carritoServicios = carritoServicios;
    }

    // toString (opcional, útil para depuración)

    @Override
    public String toString() {
        return "Carrito{" +
                "id=" + id +
                ", total=" + total +
                ", usuario=" + usuario +
                ", carritoServicios=" + carritoServicios +
                '}';
    }
}
