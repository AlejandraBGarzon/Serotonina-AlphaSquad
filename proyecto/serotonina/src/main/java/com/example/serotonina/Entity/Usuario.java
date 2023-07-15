package com.example.serotonina.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usu")
    private int id_usu;

    @Column(name = "nombre_usu")
    private String nombre_usu;

    @Column(name = "telefono_usu")
    private String telefono_usu;

    @Column(name = "correo_usu")
    private String correo_usu;

    @Column(name = "contrasenia_usu")
    private String contrasenia_usu;

    @ManyToOne
    @JoinColumn(name = "tipo_usuario_id_tipo_usu")
    private TipoUsuario tipo_usuario;

    public int getId_usu() {
        return id_usu;
    }

    public void setId_usu(int id_usu) {
        this.id_usu = id_usu;
    }

    public String getNombre_usu() {
        return nombre_usu;
    }

    public void setNombre_usu(String nombre_usu) {
        this.nombre_usu = nombre_usu;
    }

    public String getTelefono_usu() {
        return telefono_usu;
    }

    public void setTelefono_usu(String telefono_usu) {
        this.telefono_usu = telefono_usu;
    }

    public String getCorreo_usu() {
        return correo_usu;
    }

    public void setCorreo_usu(String correo_usu) {
        this.correo_usu = correo_usu;
    }

    public String getContrasenia_usu() {
        return contrasenia_usu;
    }

    public void setContrasenia_usu(String contrasenia_usu) {
        this.contrasenia_usu = contrasenia_usu;
    }

    public TipoUsuario getTipo_usuario() {
        return tipo_usuario;
    }

    public void setTipo_usuario(TipoUsuario tipo_usuario) {
        this.tipo_usuario = tipo_usuario;
    }
}
