package com.veiculo.dto;

public class ModeloDTO {
    private Long id; 
    private String nome;
    private FabricanteDTO fabricanteDTO;

    public ModeloDTO(){
    }

    public ModeloDTO(FabricanteDTO fabricanteDTO, Long id, String nome) {
        this.fabricanteDTO = fabricanteDTO;
        this.id = id;
        this.nome = nome;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public FabricanteDTO getFabricanteDTO() {
        return fabricanteDTO;
    }

    public void setFabricanteDTO(FabricanteDTO fabricanteDTO) {
        this.fabricanteDTO = fabricanteDTO;
    }

    


    
}
