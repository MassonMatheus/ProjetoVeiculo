package com.veiculo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.veiculo.Entity.veiculo;

@Repository
public interface VeiculoRepository extends JpaRepository<veiculo, Long> {
    boolean existsByPlaca (String placa);
    
}
