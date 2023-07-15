package com.example.serotonina.Service;

import com.example.serotonina.Entity.Usuario;
import com.example.serotonina.Entity.TipoUsuario;
import com.example.serotonina.Repository.UsuarioRepo;
import com.example.serotonina.Repository.TipoUsuarioRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class USIMPL implements UsuarioService {
    @Autowired
    private UsuarioRepo usuarioRepo;

    @Autowired
    private TipoUsuarioRepo tipoUsuarioRepo;

    @Override
    public List<Usuario> ConsultarUsuario() {
        List<Usuario> usuarios = new ArrayList<>();
        usuarioRepo.findAll().forEach(usuarios::add);
        return usuarios;
    }

    @Override
    public Usuario CrearUsuario(Usuario usuario) {
        int idTipoUsuario = usuario.getTipo_usuario().getId_tipo_usu(); // Corregir el nombre del método a getTipo_usuario()
        TipoUsuario tipoUsuario = tipoUsuarioRepo.obtenerTipoUsuarioPorId(idTipoUsuario);

        if (tipoUsuario != null) {
            usuario.setTipo_usuario(tipoUsuario); // Corregir el nombre del método a setTipo_usuario()
            return usuarioRepo.save(usuario);
        } else {
            // Manejar el escenario donde el tipo de usuario no se encontró en la base de datos.
            // Por ejemplo, lanzar una excepción o establecer un valor predeterminado para el tipo de usuario.
            return null;
        }
    }

    @Override
    public Usuario ModificarUsuario(Usuario usuario) {
        return usuarioRepo.save(usuario);
    }

    @Override
    public Usuario BuscarUsuario(int id_usu) {
        return usuarioRepo.findById(id_usu).orElse(null);
    }

    @Override
    public void EliminarUsuario(int id_usu) {
        usuarioRepo.deleteById(id_usu);
    }
}
