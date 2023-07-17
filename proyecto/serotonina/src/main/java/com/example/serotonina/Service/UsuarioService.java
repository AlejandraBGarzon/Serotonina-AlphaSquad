package com.example.serotonina.Service;

import com.example.serotonina.Entity.Usuario;
import java.util.List;

public interface UsuarioService {
    List<Usuario> ConsultarUsuario();
    Usuario CrearUsuario(Usuario usuario);
    Usuario ModificarUsuario(int id, Usuario usuario);
    Usuario BuscarUsuario(int id_usu);
    void EliminarUsuario(int id_usu);
}
