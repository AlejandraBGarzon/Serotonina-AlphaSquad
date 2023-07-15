package com.example.serotonina.Controller;

import com.example.serotonina.Entity.TipoUsuario;
import com.example.serotonina.Service.TipoUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tipos-usuarios")
public class TipoUsuarioController {

    @Autowired
    private TipoUsuarioService tipoUsuarioService;

    // http://localhost:8080/tipos-usuarios
    @GetMapping
    public ResponseEntity<List<TipoUsuario>> consultarTiposUsuarios() {
        List<TipoUsuario> tiposUsuarios = tipoUsuarioService.ConsultarTiposUsuario();
        return ResponseEntity.ok(tiposUsuarios);
    }

    // http://localhost:8080/tipos-usuarios
    //   "tipo_usu": "USUARIO_COMUN"
    @PostMapping
    public ResponseEntity<TipoUsuario> crearTipoUsuario(@RequestBody TipoUsuario tipoUsuario) {
        TipoUsuario nuevoTipoUsuario = tipoUsuarioService.CrearTipoUsuario(tipoUsuario);
        return ResponseEntity.ok(nuevoTipoUsuario);
    }

    // http://localhost:8080/tipos-usuarios/7
    // "tipo_usu": "CLIENTE"
    @PutMapping("/{id}")
    public ResponseEntity<TipoUsuario> modificarTipoUsuario(@PathVariable int id, @RequestBody TipoUsuario tipoUsuario) {
        TipoUsuario tipoUsuarioModificado = tipoUsuarioService.ModificarTipoUsuario(id, tipoUsuario);
        return ResponseEntity.ok(tipoUsuarioModificado);
    }

    // http://localhost:8080/tipos-usuarios/7
    @GetMapping("/{id}")
    public ResponseEntity<TipoUsuario> buscarTipoUsuario(@PathVariable int id) {
        TipoUsuario tipoUsuario = tipoUsuarioService.BuscarTipoUsuario(id);
        if (tipoUsuario != null) {
            return ResponseEntity.ok(tipoUsuario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // http://localhost:8080/tipos-usuarios/8
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarTipoUsuario(@PathVariable int id) {
        tipoUsuarioService.EliminarTipoUsuario(id);
        return ResponseEntity.noContent().build();
    }
}
