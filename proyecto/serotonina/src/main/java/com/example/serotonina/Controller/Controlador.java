package com.example.serotonina.Controller;

import com.example.serotonina.Entity.Usuario;
import com.example.serotonina.Entity.TipoUsuario;
import com.example.serotonina.Service.USIMPL;
import com.example.serotonina.Repository.TipoUsuarioRepo; // Agrega la importación del repositorio de TipoUsuario
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/CRUDRepo")
public class Controlador {

    @Autowired
    private USIMPL usimpl;

    @Autowired
    private TipoUsuarioRepo tipoUsuarioRepo; // Inyecta el repositorio de TipoUsuario

    @GetMapping("/ConsultarUsuarios")
    public ResponseEntity<List<Usuario>> ConsultarUsuarios() {
        List<Usuario> usuarioList = this.usimpl.ConsultarUsuario();
        return ResponseEntity.ok(usuarioList);
    }

    @PostMapping("/CrearUsuario")
    public ResponseEntity<Usuario> CrearUsuario(@RequestBody Usuario usuario) {
        // Aquí obtén el tipo de usuario por su ID utilizando el repositorio de TipoUsuario
        TipoUsuario tipoUsuario = tipoUsuarioRepo.obtenerTipoUsuarioPorId(usuario.getTipoUsuario().getId_tipo_usu());
        if (tipoUsuario != null) {
            usuario.setTipoUsuario(tipoUsuario);
            Usuario usuarioCrear = this.usimpl.CrearUsuario(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(usuarioCrear);
        } else {
            return ResponseEntity.badRequest().body(null); // Enviar una respuesta de error si el tipo de usuario no se encuentra
        }
    }

    @PutMapping("/ModificarUsuario")
    public ResponseEntity<Usuario> ModificarUsuario(@RequestBody Usuario usuario) {
        Usuario usuarioModificado = this.usimpl.ModificarUsuario(usuario);
        return ResponseEntity.status(HttpStatus.OK).body(usuarioModificado);
    }

    @GetMapping("/BuscarUsuario/{id}")
    public ResponseEntity<Usuario> BuscarUsuario(@PathVariable int id) {
        Usuario usuario = this.usimpl.BuscarUsuario(id);
        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/EliminarUsuario/{id}")
    public ResponseEntity<?> EliminarUsuario(@PathVariable int id) {
        this.usimpl.EliminarUsuario(id);
        return ResponseEntity.ok().build();
    }
}
