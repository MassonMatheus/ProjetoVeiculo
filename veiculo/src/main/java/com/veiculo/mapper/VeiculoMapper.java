package com.veiculo.mapper;


import com.veiculo.Entity.Modelo;
import com.veiculo.Entity.Veiculo;
import com.veiculo.dto.ModeloDTO;
import com.veiculo.dto.VeiculoDTO;

public final class VeiculoMapper {

    private VeiculoMapper() {
    }

    public static VeiculoDTO toDTO(Veiculo entity) {
        if (entity == null) return null;
    
     return new VeiculoDTO(
            entity.getAno(),
            entity.getCor(),
            entity.getDescricao(),
            entity.getId(),
            ModeloMapper.toDTO(entity.getModelo()),
            entity.getPlaca()
        );}
   
    public static Veiculo toEntity (VeiculoDTO dto){
        if (dto == null) return null;
        Veiculo v = new Veiculo();
        v.setId(dto.getId());
        v.setPlaca(dto.getPlaca());
        v.setCor(dto.getCor());
        v.setAno(dto.getAno());
        v.setDescricao(dto.getDescricao());
        ModeloDTO modeloDTO = dto.getModeloDTO();
        if (modeloDTO != null){
            Modelo m = new Modelo();
            m.setId(modeloDTO.getId());
            m.setNome(modeloDTO.getNome());
            v.setModelo(m);
        }
        return v;
    }
        
    }

