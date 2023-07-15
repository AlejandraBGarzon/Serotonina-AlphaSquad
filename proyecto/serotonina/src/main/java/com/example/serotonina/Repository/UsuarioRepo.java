package com.example.serotonina.Repository;

import com.example.serotonina.Entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepo extends JpaRepository<Usuario, Integer> {
    // Agregar métodos personalizados para consultar usuarios si es necesario.
}
