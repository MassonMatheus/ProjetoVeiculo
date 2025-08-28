package com.veiculo.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.veiculo.Entity.Fabricante;
import com.veiculo.Entity.Modelo;
import com.veiculo.dto.FabricanteDTO;
import com.veiculo.dto.ModeloDTO;

public final class ModeloMapper {
    
    private ModeloMapper(){}

    public static ModeloDTO toDTO(Modelo entity){
        if (entity == null) return null;
        Fabricante fabricante = entity.getFabricante();
        FabricanteDTO fabricanteDTO = null;
        if (fabricante != null){
            fabricanteDTO = new FabricanteDTO(fabricante.getId(), fabricante.getNome(), fabricante.getPaisOrigem());
        }
        return new ModeloDTO(fabricanteDTO, entity.getId(), entity.getNome());
    }


    public static Modelo toEntity(ModeloDTO dto){
        if (dto == null) return null;
        Modelo m = new Modelo();
        m.setId(dto.getId());
        m.setNome(dto.getNome());
        FabricanteDTO fabricanteDTO = dto.getFabricanteDTO();
        if (fabricanteDTO != null){
            Fabricante f = new Fabricante();
            f.setId(fabricanteDTO.getId());
            f.setNome(fabricanteDTO.getNome());
            f.setPaisOrigem(fabricanteDTO.getPaisOrigem());
            m.setFabricante(f);
        }
        return m;
    }

    public static List<ModeloDTO> toDTOList(List<Modelo> list){
        return list == null ?
                    List.of() :
                    list.stream().map(ModeloMapper :: toDTO).collect(Collectors.toList());
    }

    public static List<Modelo> toEntityList(List<ModeloDTO> list){
        return list == null ?
                    List.of() :
                    list.stream().map(ModeloMapper :: toEntity).collect(Collectors.toList());
    }

}
