package com.example.serotonina.Service;

import com.example.serotonina.Entity.Usuario;
import com.example.serotonina.Repository.UsuarioRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class USIMPL implements UsuarioService {
    @Autowired
    private UsuarioRepo repo;

    @Override
    public List<Usuario> ConsultarUsuario() {
        List<Usuario> usuarios = new ArrayList<>();
        repo.findAll().forEach(usuarios::add);
        return usuarios;
    }

    @Override
    public Usuario CrearUsuario(Usuario usuario) {
        return repo.save(usuario);
    }

    @Override
    public Usuario ModificarUsuario(Usuario usuario) {
        return repo.save(usuario);
    }

    @Override
    public Usuario BuscarUsuario(int id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public void EliminarUsuario(int id) {
        repo.deleteById(id);
    }
}
