const MODAL = document.getElementById("modal");
const CLOSE_MODAL_BUTTON = document.getElementById("close-modal");

CLOSE_MODAL_BUTTON.addEventListener("click", function(){
    MODAL.style.display = "none";
});

document.getElementById("novo-fabricante").addEventListener("click", async function(event){
    setMostrarOcultarElemento(true, ".modal-content");
    
    //carregar json paises
    const dadosPaises = await getData(`http://localhost:8080/paises.json`);
    const selectPais = document.getElementById("pais-fabricante");
    setRemoverElementos("#pais-fabricante option");
    dadosPaises.forEach(function(pais){
        const option = document.createElement("option");
        option.value = pais.nome_pais;
        option.textContent = pais.nome_pais;
        selectPais.appendChild(option);
    });
    MODAL.style.display = "block";
    setMostrarOcultarElemento(false, ".modal-content-fabricante");
});

document.getElementById("salvar-fabricante").addEventListener("click", async function(event){
    event.preventDefault();
    const nome = document.getElementById("nome-fabricante").value;
    const paisOrigem = document.getElementById("pais-fabricante").value;
    const novoFabricante = {nome: nome, paisOrigem: paisOrigem};

    const resultado = await postData("http://localhost:8080/api/fabricantes", novoFabricante);
    if(resultado.status === 201){
        alert("Fabricante salvo com sucesso!");
        document.getElementById("nome-fabricante").value = "";
        document.getElementById("pais-fabricante").value = "";
        MODAL.style.display = "none";

        // recarregar a pagina
        setRemoverElementos(".tabela-dados");
        document.querySelector("#fabricantes").style.display = "block";
        const dadosFabricantes = await getData("http://localhost:8080/api/fabricantes");
        document.querySelector("#fabricantes").appendChild(criarTabela(dadosFabricantes, "Fabricantes", "tabela-dados"));

    }else{
        alert ("Erro ao salvar fabricante. erro: " + resultado.message);
    }
});

document.getElementById("novo-modelo").addEventListener("click", async function(event){
    setMostrarOcultarElemento(true, ".modal-content");
   const dadosFabricantes = await getData("http://localhost:8080/api/fabricantes");
   if(dadosFabricantes.status === 404 || dadosFabricantes.error){
        alert ("Erro ao carregar fabricantes. erro: " + dadosFabricantes.message);
      return;

   }
   setRemoverElementos("#fabricante-modelo option");

   document.getElementById("fabricante-modelo").appendChild(new Option("Selecione um fabricante", ""));
   dadosFabricantes.forEach(function(fabricante){
        const option = document.createElement("option");
        option.value = fabricante.id;
        option.textContent = fabricante.nome + " (" + fabricante.paisOrigem + ")";
        document.getElementById("fabricante-modelo").appendChild(option);
   });
    MODAL.style.display = "block";
    setMostrarOcultarElemento(false, ".modal-content-modelo");
});


document.getElementById("bt-fabricantes").addEventListener("click", async function(event){
    setMostrarOcultarElemento(true, ".minha-section");
    setRemoverElementos(".tabela-dados");
    document.querySelector("#fabricantes").style.display = "block";
    const dadosFabricantes = await getData("http://localhost:8080/api/fabricantes");
    document.querySelector("#fabricantes").appendChild(criarTabela(dadosFabricantes, "Fabricantes", "tabela-dados"));
    
});

document.getElementById("bt-modelos").addEventListener("click", async function(event){
    setMostrarOcultarElemento(true, ".minha-section");
    setRemoverElementos(".tabela-dados");
    document.querySelector("#modelos").style.display = "block";
    const dadosModelos = await getData("http://localhost:8080/api/modelos");
    document.querySelector("#modelos").appendChild(criarTabelaModelo(dadosModelos));
});

document.getElementById("bt-veiculos").addEventListener("click", async function(event){
    setMostrarOcultarElemento(true, ".minha-section");
    setRemoverElementos(".tabela-dados");
    document.querySelector("#veiculos").style.display = "block";
    const dadosVeiculos = await getData("http://localhost:8080/api/veiculos");
    document.querySelector("#veiculos").appendChild(criarTabelaVeiculo(dadosVeiculos));
});
