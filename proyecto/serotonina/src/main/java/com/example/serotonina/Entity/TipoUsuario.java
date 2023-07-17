package com.example.serotonina.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tipo_usuario")
public class TipoUsuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipo_usu")
    private int id_tipo_usu;

    @Column(name = "tipo_usu")
    private String tipo_usu;

    public int getId_tipo_usu() {
        return id_tipo_usu;
    }

    public void setId_tipo_usu(int id_tipo_usu) {
        this.id_tipo_usu = id_tipo_usu;
    }

    public String getTipo_usu() {
        return tipo_usu;
    }

    public void setTipo_usu(String tipo_usu) {
        this.tipo_usu = tipo_usu;
    }
}
