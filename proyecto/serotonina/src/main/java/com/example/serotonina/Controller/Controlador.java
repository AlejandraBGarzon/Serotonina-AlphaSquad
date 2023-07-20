package com.example.serotonina.Controller;

import com.example.serotonina.Entity.Usuario;
import com.example.serotonina.Repository.UsuarioRepo;
import com.example.serotonina.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class Controlador {

    @Autowired
    private UsuarioService usuarioService;

    // GET http://localhost:8080/usuarios
    @GetMapping
    public ResponseEntity<List<Usuario>> consultarUsuarios() {
        List<Usuario> usuarios = usuarioService.ConsultarUsuario();
        return ResponseEntity.ok(usuarios);
    }

    // ENDPOINT PARA REGISTRO USUARIO //
    // POST http://localhost:8080/usuarios
    // FORMATO JSON PARA POSTMAN:
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
    public ResponseEntity<?> crearUsuario(@RequestBody Usuario usuario) {
        // Verificar si el correo electrónico ya está registrado
        if (usuarioService.isEmailRegistered(usuario.getCorreo_usu())) {
            String errorMessage = "El correo electrónico ya está registrado.";
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorMessage);
        }

        // Proceder con el registro normal creando un nuevo usuario
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

    // ENDPOINT PARA INICIO DE SESIÓN //
    @Autowired
    private UsuarioRepo usuarioRepo;

    @PostMapping("/ingreso")
    public ResponseEntity<?> login(@RequestParam("correo_usu") String correo,
                                   @RequestParam("contrasenia_usu") String contrasenia) {

        Usuario usuario = usuarioRepo.findUsuarioByCorreoAndContrasenia(correo, contrasenia);

        if (usuario != null) {
            // Autenticación exitosa
            return ResponseEntity.ok(usuario);
        } else {
            String errorMessage = "Credenciales incorrectas, por favor verifica tu correo y contraseña.";
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorMessage);
        }
    }
}

