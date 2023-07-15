package com.example.serotonina.Service;

import com.example.serotonina.Entity.TipoUsuario;
import java.util.List;

public interface TipoUsuarioService {
    List<TipoUsuario> ConsultarTiposUsuario();
    TipoUsuario CrearTipoUsuario(TipoUsuario tipoUsuario);
    TipoUsuario ModificarTipoUsuario(int id, TipoUsuario tipoUsuario);
    TipoUsuario BuscarTipoUsuario(int id_tipo_usu);
    void EliminarTipoUsuario(int id_tipo_usu);
}
