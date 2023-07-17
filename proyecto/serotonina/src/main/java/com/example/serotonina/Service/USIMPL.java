package com.example.serotonina.Service;

import com.example.serotonina.Entity.Usuario;
import com.example.serotonina.Entity.TipoUsuario;
import com.example.serotonina.Repository.UsuarioRepo;
import com.example.serotonina.Repository.TipoUsuarioRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class USIMPL implements UsuarioService {

    @Autowired
    private UsuarioRepo usuarioRepo;

    @Autowired
    private TipoUsuarioRepo tipoUsuarioRepo;

    @Override
    public List<Usuario> ConsultarUsuario() {
        return usuarioRepo.findAll();
    }

    @Override
    public Usuario CrearUsuario(Usuario usuario) {
        TipoUsuario tipoUsuario = usuario.getTipo_usuario();

        if (tipoUsuario != null) {
            int idTipoUsuario = tipoUsuario.getId_tipo_usu();
            TipoUsuario tipoUsuarioFromDB = tipoUsuarioRepo.findById(idTipoUsuario).orElse(null);

            if (tipoUsuarioFromDB != null) {
                usuario.setTipo_usuario(tipoUsuarioFromDB);
                return usuarioRepo.save(usuario);
            } else {
                throw new RuntimeException("El tipo de usuario con id " + idTipoUsuario + " no fue encontrado en la base de datos.");
            }
        } else {
            throw new RuntimeException("El usuario no tiene asignado un tipo de usuario.");
        }
    }

    @Override
    public Usuario ModificarUsuario(int id, Usuario usuario) {
        Usuario usuarioFromDB = usuarioRepo.findById(id).orElse(null);

        if (usuarioFromDB != null) {
            usuarioFromDB.setNombre_usu(usuario.getNombre_usu());
            usuarioFromDB.setTelefono_usu(usuario.getTelefono_usu());
            usuarioFromDB.setCorreo_usu(usuario.getCorreo_usu());
            usuarioFromDB.setContrasenia_usu(usuario.getContrasenia_usu());
            usuarioFromDB.setTipo_usuario(usuario.getTipo_usuario());
            return usuarioRepo.save(usuarioFromDB);
        } else {
            throw new RuntimeException("El usuario con id " + id + " no fue encontrado en la base de datos.");
        }
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
