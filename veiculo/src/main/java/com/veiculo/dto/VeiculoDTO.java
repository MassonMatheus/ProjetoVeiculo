package com.veiculo.dto;




public class VeiculoDTO {
    private Long id;
    private String placa;
    private String cor;
    private Integer ano;
    private String descricao;
    private ModeloDTO modeloDTO;

    public VeiculoDTO() {
    }

    public VeiculoDTO(Integer ano, String cor, String descricao, Long id, ModeloDTO modeloDTO, String placa) {
        this.ano = ano;
        this.cor = cor;
        this.descricao = descricao;
        this.id = id;
        this.modeloDTO = modeloDTO;
        this.placa = placa;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public Integer getAno() {
        return ano;
    }

    public void setAno(Integer ano) {
        this.ano = ano;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public ModeloDTO getModeloDTO() {
        return modeloDTO;
    }

    public void setModeloDTO(ModeloDTO modeloDTO) {
        this.modeloDTO = modeloDTO;
    }
    
}
