package com.veiculo.Controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.veiculo.dto.VeiculoDTO;
import com.veiculo.service.VeiculoService;

@RestController
@RequestMapping("/api/veiculos")
public class VeiculoController {
    
    @Autowired
    private VeiculoService service;

    @GetMapping
    public Page<VeiculoDTO> listar(
        @PageableDefault(size = 4, direction = Sort.Direction.DESC)
        Pageable pageable
    ){
        return service.listar(pageable);
    }

    @GetMapping("/todos")
    public List<VeiculoDTO> listarTodos(){
        return service.listar();
    }

    @GetMapping("/{id}")
    public VeiculoDTO buscar (@PathVariable Long id){
        return service.buscarPorId(id);
    }

    @GetMapping("/placa/{placa}")
    public VeiculoDTO buscarPorPlaca (@PathVariable String placa){
        return service.buscarPorPlaca(placa);
    }

    @GetMapping("/existe/{placa}")
    public Boolean existePorPlaca (@PathVariable String placa){
        return service.existePorPlaca(placa);
    }

    @GetMapping("/placaparcial/{placa}")
    public List<VeiculoDTO> buscarPorPlacaParcial(@RequestParam("trecho_placa") String trecho_placa){
        return service.buscarPorPlacaParcial(trecho_placa);
    }

    @PostMapping
    public ResponseEntity<VeiculoDTO> criar (@RequestBody VeiculoDTO dto){
        VeiculoDTO criado = service.criar(dto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}").buildAndExpand(criado.getId()).toUri();
        return ResponseEntity.created(location).body(criado);
    }
    
    @PutMapping("/{id}")
    public VeiculoDTO atualizar (@PathVariable Long id, @RequestBody VeiculoDTO dto){
        return service.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar (@PathVariable Long id){
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
