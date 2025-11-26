/**
 * Cria Tabela HTML 
 * @param {Array} dados 
 * @returns {HTMLTableElement}
 * 
 * @example
 * const veiculos = await getData("http://localhost:8080/api/veiculos");
 * const tabela = criarTabelaVeiculo(veiculos);
 * document.querySelector("#veiculos").appendChild(tabela);
 */

const criarTabelaVeiculo = function(dados){
    dados = dados.content;
    const tabela = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const trTittle = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = "Veículos";
    th.colSpan = 7; // Ajuste conforme o número de colunas
    trTittle.appendChild(th);
    thead.appendChild(trTittle);

const cabecalho = ["Modelo", "Fabricante", "Placa", "Cor", "Ano", "Descrição", "Ações"];
const tr = document.createElement("tr");
cabecalho.forEach(function(campo){
    const th = document.createElement("th");
    th.textContent = campo;
    tr.appendChild(th);
});

tabela.classList.add("tabela-dados");

thead.appendChild(tr);
tabela.appendChild(thead);

dados.forEach(function(item){
    const tr = document.createElement("tr");
    //Modelo
    const tdModelo = document.createElement("td");
    tdModelo.textContent = item.modelo.nome;
    tr.appendChild(tdModelo);

    //Fabricante
    const tdFabricante = document.createElement("td");
    tdFabricante.textContent = item.modelo.fabricante.nome;
    tr.appendChild(tdFabricante);

    //Placa
    const tdPlaca = document.createElement("td");
    tdPlaca.textContent = item.placa;
    tr.appendChild(tdPlaca);

    //Cor
    const tdCor = document.createElement("td");
    tdCor.textContent = item.cor;
    tr.appendChild(tdCor);

    //Ano
    const tdAno = document.createElement("td");
    tdAno.textContent = item.ano;
    tr.appendChild(tdAno);

    //Descrição
    const tdDescricao = document.createElement("td");
    tdDescricao.textContent = item.descricao;
    tr.appendChild(tdDescricao);

    //Acões
    const tdAcoes = document.createElement("td");
    tdAcoes.style.display = "flex";
    tdAcoes.style.gap = "5px";

    //Editar
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "✏️";
    btnEditar.classList.add("btn", "edit");
    btnEditar.style.cursor = "pointer";
    btnEditar.addEventListener("click", async function(event){
        if(confirm("Confirma a edição deste veículo?") === true){
            await abrirModalEdicaoVeiculo(item);
        }
    });

    //deletar
    const btnDeletar = document.createElement("button");
    btnDeletar.textContent = "🗑️";
    btnDeletar.classList.add("btn", "delete");
    btnDeletar.addEventListener("click", async function(event){
        if(confirm("Confirma a exclusão do veículo?")){
        const resultado = await setDeletar(`http://localhost:8080/api/veiculos/${item.id}`);
        if (!isSucess(resultado)){
            this.parentElement.remove();
            alert("Veículo deletado com sucesso.");         
        }else{
           mostrarErro(resultado);
                }
            }
        });
    tdAcoes.appendChild(btnEditar);
    tdAcoes.appendChild(btnDeletar);
    tr.appendChild(tdAcoes);
    tbody.appendChild(tr);
})

tabela.appendChild(tbody);
return tabela;
}

/**
 * Carrega os fabricantes Disponiveis no select do Formulario de Veículo
 * @returns {Promise<void>}
 * @example
 * await carregarFabricantesVeiculo();
*/
const carregarFabricantesVeiculo = async function(){
    const selectFabricante = document.getElementById("fabricante-veiculo");
    const selectModelo = document.getElementById("modelo-veiculo");

    setRemoverElementos("#fabricante-veiculo option");
    setRemoverElementos("#modelo-veiculo option");

    const dadosFabricantes = await getData("http://localhost:8080/api/fabricantes");

    // Adiciona Opção Padrão
    const optionPadrao = document.createElement("option");
    optionPadrao.value = "";
    optionPadrao.textContent = "Selecione o fabricante";
    selectFabricante.appendChild(optionPadrao);

    // Adiciona os Fabricantes
    dadosFabricantes.forEach(function(fabricante){
        const option = document.createElement("option");
        option.value = fabricante.id;
        option.textContent = fabricante.nome;
        selectFabricante.appendChild(option);
    });

    // Inicializa o select de modelo congelado
    const optionModeloPadrao = document.createElement("option");
    optionModeloPadrao.value = "";
    optionModeloPadrao.textContent = "Selecione um fabricante Primeiro";
    selectModelo.appendChild(optionModeloPadrao);
    selectModelo.disabled = true;
}

/**
 *  Carrega os modelos disponiveis no select baseado no fabricante selecionado
 *  @param {number} fabricanteId 
 *  @returns {Promise<void>}
 *  @example
 * await carregarModelosVeiculo(1);
*/
const carregarModelosVeiculo = async function(fabricanteId){
    const selectModelo = document.getElementById("modelo-veiculo");
    setRemoverElementos("#modelo-veiculo option");

    // Se não selecionou fabricantes
    if(!fabricanteId){
        const optionPadrao = document.createElement("option");
        optionPadrao.value = "";
        optionPadrao.textContent = "Selecione um fabricante Primeiro";
        selectModelo.appendChild(optionPadrao);
        selectModelo.disabled = true; // Congela o Select
        return;
    }

    // busca e filtra os modelos
    const dadosModelos = await getData("http://localhost:8080/api/modelos");
    const modelosFiltrados = dadosModelos.filter(function(modelo){
        return modelo.fabricante.id == fabricanteId;
    });

    // Se não existem modelos para o fabricante, congela o select
    if(modelosFiltrados.length === 0){
        const optionsSemModelo = document.createElement("option");
        optionsSemModelo.value = "";
        optionsSemModelo.textContent = "Nenhum modelo disponível para este fabricante";
        selectModelo.appendChild(optionsSemModelo);
        selectModelo.disabled = true; // Congela o Select
        return;
    }

    // Habilita o select e adciona opção padrão
    selectModelo.disabled = false;
    const optionPadrao = document.createElement("option");
    optionPadrao.value = "";
    optionPadrao.textContent = "Selecione o modelo";
    selectModelo.appendChild(optionPadrao);

    // Adiciona os Modelos filtrados
    modelosFiltrados.forEach(function(modelo){
        const option = document.createElement("option");
        option.value = modelo.id;
        option.textContent = modelo.nome;
        selectModelo.appendChild(option);
    });
}

/**
 * Atualiza a tabela de veiculos
 * @returns {Promise<void>}
 * @example
 * await AtualizarTabelaVeiculos();
 */
const AtualizarTabelaVeiculos = async function(){
    setRemoverElementos(".tabela-dados");
    document.querySelector("#veiculos").style.display = "block";
    const dadosVeiculos = await getData("http://localhost:8080/api/veiculos");
    document.querySelector("#veiculos").appendChild(criarTabelaVeiculo(dadosVeiculos));
}

/**
 * valida o formato da placa
 * @param {string} placa 
 * @returns {Object}
 * 
 * @example
 * 
 */
const validarPlaca = function(placa){
   //remove espaços em branco e hifens
   placa = placa.trim().toUpperCase().replace(/-/g, '');

   // formarto antigo 
   const padraoAntigo = /^[A-Z]{3}[0-9]{4}$/;

   //formato novo
   const padraoNovo = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;

   if (padraoAntigo.test(placa) || padraoNovo.test(placa)){
        return {valido: true, mensagem: ""};
   }
   return {
    valido: false,
    mensagem: "Placa inválida. Use o formato ABC1234 ou ABC1D23."
   }
}

/**
 * Valida os dados do formulario 
 * @param {Object} veiculo
 * @returns {Object}
 * 
 * @example
 * const resultado = validarVeiculo({fabricante: {id: 1}, modelo: {id: 2}, ano: 2020, placa: "ABC1234", cor: "Azul"});
 * if(!resultado.valido){
 *  alert(resultado.mensagem);
 * } 
 */
const validarVeiculo = function(veiculo){
    const anoAtual = new Date().getFullYear();
    const selectModelo = document.getElementById("modelo-veiculo");
    const selectFabricante = document.getElementById("fabricante-veiculo");

    //Verifica se o fabricante foi selecionado
    if (!selectFabricante.value){
        return {valido: false, mensagem: "Selecione um fabricante."};
    }

    //verifica se o select de modelo esta desabilitado
    if(selectModelo.disabled){
        return {valido: false, mensagem: "Selecione um fabricante válido."};
    }

    if(!veiculo.modelo || !veiculo.modelo.id){
        return {valido: false, mensagem: "Selecione um modelo."};
    }

    if(!veiculo.ano || veiculo.ano < 1886 || veiculo.ano > anoAtual +1){
        return {valido: false, mensagem: `Ano inválido. Insira um ano entre 1886 e ${anoAtual +1}.`};
    }

    if(!veiculo.placa || veiculo.placa.trim() === ""){
        return {valido: false, mensagem: "Insira uma placa."};
    }

    const validacaoPlaca = validarPlaca(veiculo.placa);
    if(!validacaoPlaca.valido){
        return {valido: false, mensagem: validacaoPlaca.mensagem};
    }

    if(!veiculo.cor || veiculo.cor.trim() === ""){
        return {valido: false, mensagem: "Insira uma cor."};
    }

    if(!veiculo.descricao || veiculo.descricao.trim() === ""){
        return {valido: false, mensagem: "Insira uma descrição."};
    }

    return {valido: true, mensagem: ""};
}

// limpa todos os campos do formulario

const limparFormularioVeiculo = function(){
    document.getElementById("fabricante-veiculo").value = "";
    document.getElementById("modelo-veiculo").value = "";
    document.getElementById("ano-veiculo").value = "";
    document.getElementById("placa-veiculo").value = "";
    document.getElementById("cor-veiculo").value = "";
    document.getElementById("descricao-veiculo").value = "";
}


async function abrirModalEdicaoVeiculo(veiculo) {
    veiculoEmEdicao = veiculo.id; //modo de edição
    setMostrarOcultarElemento(true, ".modal-content");

    document.getElementById("modal-title").textContent = "Edição de Veículo";

    await carregarFabricantesVeiculo();
    MODAL.style.display = "block";
    setMostrarOcultarElemento(false, ".modal-content-veiculo");
}

let veiculoEmEdicao = null;
// INICIALIZAÇÃO DOS EVENTOS DE VEICULOS
const inicializarEventosVeiculos = function(){
   
    //evento click no menu veículos
    document.getElementById("bt-veiculos").addEventListener("click", async function(event){
        setMostrarOcultarElemento(true, ".minha-section");
        setRemoverElementos(".tabela-dados");
        document.querySelector("#veiculos").style.display = "block";

        //carrega e exige a tabela
        const dadosVeiculos = await getData("http://localhost:8080/api/veiculos");
        if(dadosVeiculos.ok === false){
            document.querySelector("#veiculos").innerHTML = "<p>Erro ao carregar os veículos.</p>";
            document.querySelector("#veiculos").style.color = "red";
            return;
        }
        document.querySelector("#veiculos").appendChild(criarTabelaVeiculo(dadosVeiculos));
    });

    //evento click no botão Novo Veiculo
    document.getElementById("novo-veiculo").addEventListener("click", async function(event){
        veiculoEmEdicao = null; //modo de criação
        setMostrarOcultarElemento(true, ".modal-content");

        document.getElementById("modal-title").textContent = "Cadastro de Veículo";

        //carrega os fabricantes no select
        await carregarFabricantesVeiculo();

        MODAL.style.display = "block";
        setMostrarOcultarElemento(false, ".modal-content-veiculo");
    });

    //Evento Mudança no select de Fabricante
    document.getElementById("fabricante-veiculo").addEventListener("change", async function(event){
        const fabricanteId = event.target.value;
        await carregarModelosVeiculo(fabricanteId);
    });


    // EVENTO FORMATAR PLACA
    document.getElementById("placa-veiculo").addEventListener("input", function(event){
        let valor = event.target.value.toUpperCase();

        // Remove caracteres inválidos
        valor = valor.replace(/[^A-Z0-9]/g, '');

        // Limita o tamanho
        if(valor.length > 7){
            valor = valor.substring(0, 7);
        }

        event.target.value = valor;
    });

    //Evento Verificação da Placa Duplicada
    document.getElementById("placa-veiculo").addEventListener("blur", async function(event){
        const placa = event.target.value.trim().toUpperCase().replace(/-/g, '');

        //So verifica se a placa tem formato valido
        if(placa.length >= 7){
            const validacao = validarPlaca(placa);
            if(validacao.valido){
                //verifica se ja existe
                const existe = await getData(`http://localhost:8080/api/veiculos/existe/${placa}`);
                if(existe){
                    event.target.style.borderColor = "red";
                    event.target.style.backgroundColor = "#ffcccc";
                    alert(`Atenção \n\A placa ${placa} ja esta cadastra no sistema`);
                    }else {
                        event.target.style.borderColor = "";
                        event.target.style.backgroundColor = "";
                    }
                }
            }   
        });

    // Evento Submissão do Formulário de Veículo
    document.querySelector("#form-veiculo .botao-enviar").addEventListener("click", async function(event){
        event.preventDefault();

        const modeloId = document.getElementById("modelo-veiculo").value;
        const ano = parseInt(document.getElementById("ano-veiculo").value);
        //remove hifen e espaços, convert para maisuculos
        const placa = document.getElementById("placa-veiculo").value.trim().toUpperCase().replace(/-/g, '');
        const cor = document.getElementById("cor-veiculo").value.trim();
        const descricao = document.getElementById("descricao-veiculo").value.trim();

        //cria o objeto veiculo
        const novoVeiculo = {
            placa: placa,
            cor: cor,
            ano: ano,
            descricao: descricao,
            modelo: { id: modeloId}    
        };

        //Valida os dados do veiculo
        const validacao = validarVeiculo(novoVeiculo);
        if(!validacao.valido){
            alert(validacao.mensagem);
            return;
        }

        //Envia para a API
        const resultado = await postData("http://localhost:8080/api/veiculos", novoVeiculo);

        if(!isSucess(resultado)){
            alert("Veículo salvo com sucesso!");
            limparFormularioVeiculo();
            MODAL.style.display = "none";
            await AtualizarTabelaVeiculos();
        } else {
            console.error("Erro ao salvar veículo:", resultado);

            //Tratamento Especifico
            if(resultado.status === 409 ){
                //verifica se a mensagem menciona a placa
                const mensagemBackend = resultado.message || "";
                if(mensagemBackend.toLowerCase().includes("placa")){
                    alert(`Erro ao salvar veículo. A placa ${placa} já está cadastrada.`);
            }else{
                //Pode ser outro tipo de conflito
                alert(`Registo Duplicado ${mensagemBackend}.`);
            }
        }else{
            mostrarErro(resultado);
        }
    }
    });
}

// Inicialização Automatica
if(document.readyState === 'loading'){
    document.addEventListener("DOMContentLoaded", inicializarEventosVeiculos);
    } else{
        //DOM já carregado
        inicializarEventosVeiculos();
    }
