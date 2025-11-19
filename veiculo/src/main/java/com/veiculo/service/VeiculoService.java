package com.veiculo.service;

import java.time.Year;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.veiculo.Entity.Modelo;
import com.veiculo.Entity.Veiculo;
import com.veiculo.dto.VeiculoDTO;
import com.veiculo.mapper.ModeloMapper;
import com.veiculo.mapper.VeiculoMapper;
import com.veiculo.repository.ModeloRepository;
import com.veiculo.repository.VeiculoRepository;
import com.veiculo.util.ValidaVeiculo;

@Service
public class VeiculoService {
    
    @Autowired
    private VeiculoRepository repository;

    @Autowired
    private ModeloRepository modeloRepository;

    @Autowired
    private MessageSource messageSource;

    @Transactional(readOnly = true)
    public Page<VeiculoDTO> listar(Pageable pageable){
        return repository.findAll(pageable).map(VeiculoMapper::toDto);
    }

    @Transactional(readOnly = true)
    public List<VeiculoDTO> listar(){
        return VeiculoMapper.toDtoList(repository.findAll());
    }

    @Transactional(readOnly = true)
    public VeiculoDTO buscarPorId(Long id){
        return repository.findById(id)
                .map(VeiculoMapper::toDto)
                .orElseThrow(() -> new RuntimeException(messageSource.getMessage("veiculo.nao.encotrado",null, LocaleContextHolder.getLocale())));
    }

    @Transactional(readOnly = true)
    public VeiculoDTO buscarPorPlaca(String placa){
        if(placa == null || placa.isBlank()){
            throw new IllegalArgumentException(messageSource.getMessage("veiculo.nao.encontrado",null,  LocaleContextHolder.getLocale()));
        }
        return repository.findByPlaca(placa.trim())
                .map(VeiculoMapper::toDto)
                .orElseThrow(() -> new RuntimeException(messageSource.getMessage("veiculo.nao.encontrado", null, LocaleContextHolder.getLocale())));
    }

    @Transactional(readOnly = true)
    public boolean existePorPlaca(String placa){
        return  repository.existsByPlaca(placa);
    }

    @Transactional
    public List<VeiculoDTO> buscarPorPlacaParcial(String termo){
        if (termo == null || termo.isBlank()) {
            throw new IllegalArgumentException(messageSource.getMessage("veiculo.nao.encontrado", null, LocaleContextHolder.getLocale()));
        }
        return VeiculoMapper.toDtoList(repository.findByPlacaContainingIgnoreCase(termo.trim()));
    }

    @Transactional
    public VeiculoDTO criar (VeiculoDTO dto){
        if(dto.getId() != null){
            throw new IllegalArgumentException(messageSource.getMessage("operacao.falha", new Object[]{"ID presente"}, LocaleContextHolder.getLocale()));
        }
            if(!ValidaVeiculo.isPlacaValida(dto.getPlaca())){
            throw new IllegalArgumentException(messageSource.getMessage("erro.formato.placa", new Object[]{dto.getPlaca()}, LocaleContextHolder.getLocale()));
        }

        if(repository.existsByPlaca(dto.getPlaca())){
            throw new IllegalArgumentException(messageSource.getMessage("erro.recurso.existe", new Object[]{dto.getPlaca()}, LocaleContextHolder.getLocale()));
        }

        if(dto.getModelo() == null || dto.getModelo().getId() == null){
            throw new IllegalArgumentException(messageSource.getMessage("erro.recurso.invalido", new Object[]{"Modelo"}, LocaleContextHolder.getLocale()));
       }

       if(modeloRepository.findById(dto.getModelo().getId()).isEmpty()){
            throw new IllegalArgumentException(messageSource.getMessage("erro.nao.encontrado", new Object[]{"Modelo"}, LocaleContextHolder.getLocale()));
        }

        if(dto.getAno() == null || dto.getAno() < 1886 || dto.getAno() > Year.now().getValue() + 1){
            throw new IllegalArgumentException(messageSource.getMessage("erro.formato.ano", null, LocaleContextHolder.getLocale()));
        }

        Veiculo salvo = repository.save(VeiculoMapper.toEntity(dto));
        return VeiculoMapper.toDto(salvo);
    }
    

    //@Transactional (readOnly = true)
    public VeiculoDTO atualizar (Long id, VeiculoDTO dto){
        Veiculo existente = repository.findById(id)
            .orElseThrow(() -> new RuntimeException(messageSource.getMessage("veiculo.nao.encotrado", null, LocaleContextHolder.getLocale())));
            if(dto.getPlaca() != null && !dto.getPlaca().equals(existente.getPlaca())){
                if(repository.existsByPlaca(dto.getPlaca())){
                    throw new IllegalArgumentException(messageSource.getMessage("erro.recurso.existe", new Object[]{dto.getPlaca()}, LocaleContextHolder.getLocale()));
                }
                existente.setPlaca(dto.getPlaca());
            }
            if(dto.getCor() != null) existente.setCor(dto.getCor());
            if(dto.getDescricao() != null) existente.setDescricao(dto.getDescricao());   
            if(dto.getAno() != null) existente.setAno(dto.getAno());
            if(dto.getModelo() != null) {
                Modelo modelo = ModeloMapper.toEntity(dto.getModelo());
                existente.setModelo(modelo);
            }
            return VeiculoMapper.toDto(repository.save(existente));  
    }

    @Transactional
    public void deletar (Long id){
        if(!repository.existsById(id)){
            throw new RuntimeException(messageSource.getMessage("veiculo.nao.encotrado", null, LocaleContextHolder.getLocale()));
        }
        repository.deleteById(id);
        
    }
}
