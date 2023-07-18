package com.example.serotonina.Controller;

import com.example.serotonina.Entity.Usuario;
import com.example.serotonina.Repository.UsuarioRepo;
import com.example.serotonina.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class Controlador {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepo usuarioRepo;

    // GET http://localhost:8080/usuarios
    @GetMapping
    public ResponseEntity<List<Usuario>> consultarUsuarios() {
        List<Usuario> usuarios = usuarioService.ConsultarUsuario();
        return ResponseEntity.ok(usuarios);
    }

    // POST http://localhost:8080/usuarios
    //{
    //  "nombre_usu": "John Doe",
    //  "telefono_usu": "123456789",
    //  "correo_usu": "johndoe@example.com",
    //  "contrasenia_usu": "secreta123",
    //  "tipo_usuario": {
    //    "id_tipo_usu": 1
    //  }
    //}
    @PostMapping
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = usuarioService.CrearUsuario(usuario);
        return ResponseEntity.ok(nuevoUsuario);
    }

    // http://localhost:8080/usuarios/1
    // {
    //  "nombre_usu": "John Doe Modificado",
    //  "telefono_usu": "987654321",
    //  "correo_usu": "johndoe_modificado@example.com",
    //  "contrasenia_usu": "nueva_contrasenia",
    //  "tipo_usuario": {
    //    "id_tipo_usu": 2
    //  }
    //}
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> modificarUsuario(@PathVariable int id, @RequestBody Usuario usuario) {
        Usuario usuarioModificado = usuarioService.ModificarUsuario(id, usuario);
        return ResponseEntity.ok(usuarioModificado);
    }

    // GET http://localhost:8080/usuarios/1
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarUsuario(@PathVariable int id) {
        Usuario usuario = usuarioService.BuscarUsuario(id);
        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // http://localhost:8080/usuarios/2
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable int id) {
        usuarioService.EliminarUsuario(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/ingreso")
    public String login(@RequestParam String your_email, @RequestParam String your_pass) {
        // Consulta el usuario en la base de datos por correo electrónico
        Usuario usuario = usuarioRepo.findByCorreoUsu(your_email);
        if (usuario != null) {
            // Verifica la contraseña
            if (usuario.getContrasenia_usu().equals(your_pass)) {
                // Inicio de sesión exitoso
                return "redirect:/bienvenida.html";
            }
        }

        // Credenciales inválidas, redirige a la página de inicio de sesión nuevamente
        return "redirect:/usuarios/ingreso?error";
    }
}
