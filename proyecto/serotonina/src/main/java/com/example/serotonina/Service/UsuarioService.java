package com.example.serotonina.Service;

import com.example.serotonina.Entity.Usuario;

import java.util.List;
public interface UsuarioService {
    public List<Usuario> ConsultarUsuario();

    public Usuario CrearUsuario(Usuario usuario);

    public Usuario ModificarUsuario(Usuario usuario);

    public Usuario BuscarUsuario(int idUsuario);

    public void EliminarUsuario(int idUsuario);
}
