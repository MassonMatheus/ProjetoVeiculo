document.getElementById("bt-fabricantes").addEventListener("click", async function(event){
    setMostrarOcultarElemento(true, ".minha-section");
    setRemoverElementos(".tabela-dados");
    document.querySelector("#fabricantes").style.display = "block";
    const dados = await getData("http://localhost:8080/api/fabricantes");
    document.querySelector("#fabricantes").appendChild(criarTabela(dados, "Fabricantes", "tabela-dados"));
    
});

document.getElementById("bt-modelos").addEventListener("click", async function(event){
    setMostrarOcultarElemento(true, ".minha-section");
    setRemoverElementos(".tabela-dados");
    document.querySelector("#modelos").style.display = "block";
    const dados = await getData("http://localhost:8080/api/modelos");
    document.querySelector("#modelos").appendChild(criarTabela(dados, "Modelos", "tabela-dados"));
    
});

document.getElementById("bt-veiculos").addEventListener("click", async function(event){
    setMostrarOcultarElemento(true, ".minha-section");
    setRemoverElementos(".tabela-dados");
    document.querySelector("#veiculos").style.display = "block";
    const dados = await getData("http://localhost:8080/api/veiculos");
    document.querySelector("#veiculos").appendChild(criarTabela(dados, "Veículos", "tabela-dados"));

    
});