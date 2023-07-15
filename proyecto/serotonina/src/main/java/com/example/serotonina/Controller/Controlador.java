package com.example.serotonina.Controller;

import com.example.serotonina.Entity.Usuario;
import com.example.serotonina.Service.USIMPL;
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

    @GetMapping("/ConsultarUsuarios")
    public ResponseEntity<List<Usuario>> ConsultarUsuarios() {
        List<Usuario> usuarioList = this.usimpl.ConsultarUsuario();
        return ResponseEntity.ok(usuarioList);
    }

    @PostMapping("/CrearUsuario")
    public ResponseEntity<Usuario> CrearUsuario(@RequestBody Usuario usuario) {
        Usuario usuarioCrear = this.usimpl.CrearUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioCrear);
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
