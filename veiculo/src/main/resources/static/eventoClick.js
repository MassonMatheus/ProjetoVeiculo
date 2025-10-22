document.getElementById("bt-fabricantes").addEventListener("click", async function(event){
    setMostrarOcultarElemento(true, ".minha-section");
    setRemoverElementos(".tabela-dados");
    document.querySelector("#fabricantes").style.display = "block";
    const dados = await getData("http://localhost:8080/api/fabricantes");
    if(dados.ok === false){
        document.querySelector("#fabricantes").innerHTML = `<p>Erro ao Carregar Dados dos Fabricantes.<p>`;
        document.querySelector("#fabricantes").style.color = "Blue";
        return;
    }
    document.querySelector("#fabricantes").appendChild(criarTabela(dados, "Fabricantes", "tabela-dados"));
    
});

document.getElementById("bt-modelos").addEventListener("click", async function(event){
    setMostrarOcultarElemento(true, ".minha-section");
    setRemoverElementos(".tabela-dados");
    document.querySelector("#modelos").style.display = "block";
    const dadosModelos = await getData("http://localhost:8080/api/modelos");
    if(dadosModelos.ok === false){
    document.querySelector("#modelos").innerHTML = `<p>Erro ao Carregar Dados dos Modelos.<p>`;
    document.querySelector("#modelos").style.color = "blue";

        return;
    }
    document.querySelector("#modelos").appendChild(criarTabelaModelo(dadosModelos));
});

document.getElementById("bt-veiculos").addEventListener("click", async function(event){
    setMostrarOcultarElemento(true, ".minha-section");
    setRemoverElementos(".tabela-dados");
    document.querySelector("#veiculos").style.display = "block";
    const dadosVeiculos = await getData("http://localhost:8080/api/veiculos");
    if(dadosVeiculos.ok === false){
        document.querySelector("#veiculos").innerHTML = `<p>Erro ao Carregar Dados dos Veículos.<p>`;
        document.querySelector("#veiculos").style.color = "BLUE";
        return;
    }
    document.querySelector("#veiculos").appendChild(criarTabelaVeiculo(dadosVeiculos));

    
});