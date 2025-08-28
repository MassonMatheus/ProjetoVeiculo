package com.veiculo.mapper;


import com.veiculo.Entity.Modelo;
import com.veiculo.Entity.veiculo;
import com.veiculo.dto.ModeloDTO;
import com.veiculo.dto.VeiculoDTO;

public final class VeiculoMapper {

    private VeiculoMapper() {
    }

    /**
     * Converte uma entidade Veiculo em um DTO.
     * @param entity A entidade Veiculo que será convertida.
     * @return Um objeto VeiculoDTO com os dados mapeados.
     */

    public static VeiculoDTO toDTO(veiculo entity) {
        if (entity == null) return null;
        ModeloDTO modeloDTO = new ModeloDTO();
        modeloDTO.setId(entity.getModelo().getId());
        return new VeiculoDTO(entity.getAno(), entity.getCor(), entity.getDescricao(),
                entity.getId(), modeloDTO, entity.getPlaca());
    }
   
    public static veiculo toEntity (VeiculoDTO dto){
        if (dto == null) return null;
        veiculo v = new veiculo();
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

