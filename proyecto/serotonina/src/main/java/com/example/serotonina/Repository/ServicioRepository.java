package com.example.serotonina.Repository;

import com.example.serotonina.Entity.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long> {
    List<Servicio> findByTipo(String tipo);

    List<Servicio> findByPrecioLessThan(Long precio);

    List<Servicio> findByPrecioBetween(Long minPrecio, Long maxPrecio);

    List<Servicio> findByOrderByPrecioAsc();

    List<Servicio> findByOrderByPrecioDesc();
}
