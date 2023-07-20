package com.example.serotonina.Repository;

import com.example.serotonina.Entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepo extends JpaRepository<Usuario, Integer> {
    @Query("SELECT u FROM Usuario u WHERE u.correo_usu = ?1 AND u.contrasenia_usu = ?2")
    Usuario findUsuarioByCorreoAndContrasenia(String correo, String contrasenia);
    @Query(value = "SELECT * FROM usuarios WHERE correo_usu = ?1", nativeQuery = true)
    Usuario findUsuarioByCorreoUsu(String correoUsu);
}

