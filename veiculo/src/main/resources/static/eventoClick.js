const MODAL = document.getElementById("modal");
const CLOSE_MODAL_BUTTON = document.getElementById("close-modal");

CLOSE_MODAL_BUTTON.addEventListener("click", function(){
    MODAL.style.display = "none";
});

document.getElementById("novo-fabricante").addEventListener("click", function(event){
    setMostrarOcultarElemento(true, ".modal-content");
    MODAL.style.display = "block"; //MODAL é uma constante global, por isso em maiusculo.
    setMostrarOcultarElemento(false, ".modal-content-fabricante");
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
