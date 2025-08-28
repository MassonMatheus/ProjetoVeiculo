package com.veiculo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.veiculo.Entity.Modelo;

@Repository
public interface ModeloRepository extends JpaRepository<Modelo, Long> {
    boolean existsByNome (String nome);
}
