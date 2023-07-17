package com.example.serotonina.Service;

import com.example.serotonina.Entity.TipoUsuario;
import com.example.serotonina.Repository.TipoUsuarioRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TUSIMPL implements TipoUsuarioService {

    @Autowired
    private TipoUsuarioRepo tipoUsuarioRepo;

    @Override
    public List<TipoUsuario> ConsultarTiposUsuario() {
        return tipoUsuarioRepo.findAll();
    }

    @Override
    public TipoUsuario CrearTipoUsuario(TipoUsuario tipoUsuario) {
        return tipoUsuarioRepo.save(tipoUsuario);
    }

    @Override
    public TipoUsuario ModificarTipoUsuario(int id, TipoUsuario tipoUsuario) {
        TipoUsuario tipoUsuarioFromDB = tipoUsuarioRepo.findById(id).orElse(null);

        if (tipoUsuarioFromDB != null) {
            tipoUsuarioFromDB.setTipo_usu(tipoUsuario.getTipo_usu());
            return tipoUsuarioRepo.save(tipoUsuarioFromDB);
        } else {
            throw new RuntimeException("El tipo de usuario con id " + id + " no fue encontrado en la base de datos.");
        }
    }

    @Override
    public TipoUsuario BuscarTipoUsuario(int id_tipo_usu) {
        return tipoUsuarioRepo.findById(id_tipo_usu).orElse(null);
    }

    @Override
    public void EliminarTipoUsuario(int id_tipo_usu) {
        tipoUsuarioRepo.deleteById(id_tipo_usu);
    }
}
