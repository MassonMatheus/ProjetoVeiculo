const MODAL = document.getElementById("modal");
const CLOSE_MODAL_BUTTON = document.getElementById("close-modal");

CLOSE_MODAL_BUTTON.addEventListener("click", function(){
    MODAL.style.display = "none";
});

//Variavel global para armazenar o id do fabricante sendo editado
let fabricanteEmEdicao = null;

document.getElementById("novo-fabricante").addEventListener("click", async function(event){
    fabricanteEmEdicao = null;
    setMostrarOcultarElemento(true, ".modal-content");

    document.getElementById("modal-title").textContent = "Cadastro de Fabricante";
    
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

    document.getElementById("nome-fabricante").value = "";
    document.getElementById("pais-fabricante").value = "";

    MODAL.style.display = "block";
    setMostrarOcultarElemento(false, ".modal-content-fabricante");
});

// Função para abrir o modal de edição de fabricante
async function abrirModalEdicaoFabricante(fabricante){
    fabricanteEmEdicao = fabricante.id; // Armazena o ID do fabricante sendo editado
    setMostrarOcultarElemento(true, ".modal-content");

    //Atualizar o título do modal
    document.getElementById("modal-title").textContent = "Editar Fabricante";

    //Carregar os paises
    const dadosPaises = await getData(`http://localhost:8080/paises.json`);
    const selectPais = document.getElementById("pais-fabricante");
    setRemoverElementos("#pais-fabricante option");
    dadosPaises.forEach(function(pais){
        const option = document.createElement("option");
        option.value = pais.nome_pais;
        option.textContent = pais.nome_pais;
        selectPais.appendChild(option);
    });

    //Preencher os campos com os dados do fabricante
    document.getElementById("nome-fabricante").value = fabricante.nome;
    document.getElementById("pais-fabricante").value = fabricante.paisOrigem;

    MODAL.style.display = "block";
    setMostrarOcultarElemento(false, ".modal-content-fabricante");
}

document.getElementById("salvar-fabricante").addEventListener("click", async function(event){
    event.preventDefault();
    const nome = document.getElementById("nome-fabricante").value;
    const paisOrigem = document.getElementById("pais-fabricante").value;
    const fabricanteData = {nome: nome, paisOrigem: paisOrigem};

    let resultado;
    if(fabricanteEmEdicao){
        // Modo de edição - usa PUT
        resultado = await putData(`http://localhost:8080/api/fabricantes/${fabricanteEmEdicao}`, fabricanteData);
    }else{
        // Modo de criação - usa POST
        resultado = await postData("http://localhost:8080/api/fabricantes", fabricanteData);
    }
   
    if(!isSucess(resultado)){
        const mensagem = fabricanteEmEdicao ? "Fabricante atualizado com sucesso!" : "Fabricante Salvo com sucesso!";
        alert(mensagem);
        document.getElementById("nome-fabricante").value = "";
        document.getElementById("pais-fabricante").value = "";
        fabricanteEmEdicao = null;
        MODAL.style.display = "none";

        // recarregar a pagina
        setRemoverElementos(".tabela-dados");
        document.querySelector("#fabricantes").style.display = "block";
        const dadosFabricantes = await getData("http://localhost:8080/api/fabricantes");
        document.querySelector("#fabricantes").appendChild(criarTabela(dadosFabricantes, "Fabricantes", "tabela-dados"));

    }else{
        mostrarErro(resultado);
    }
});

//Variavel global para armazenar o id do modelo sendo editado
let modeloEmEdicao = null;

document.getElementById("novo-modelo").addEventListener("click", async function(event){
    modeloEmEdicao = null;
    setMostrarOcultarElemento(true, ".modal-content");

    //Atualizar o título do modal
    document.getElementById("modal-title").textContent = "Cadastro de Modelo";

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

    // preencher os campos com valores vazios
    document.getElementById("nome-modelo").value = "";
    document.getElementById("fabricante-modelo").value = "";

    MODAL.style.display = "block";
    setMostrarOcultarElemento(false, ".modal-content-modelo");
});

async function abrirModalEdicaoModelo(modelo) {
    modeloEmEdicao = modelo.id; // Armazena o ID do modelo sendo editado
    setMostrarOcultarElemento(true, ".modal-content");

    //Atualizar o título do modal
    document.getElementById("modal-title").textContent = "Editar Modelo";

    //Carregar os fabricantes
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

    //Preencher os campos com os dados do modelo
    document.getElementById("nome-modelo").value = modelo.nome;
    document.getElementById("fabricante-modelo").value = modelo.fabricante.id;


    MODAL.style.display = "block";
    setMostrarOcultarElemento(false, ".modal-content-modelo");
}

document.getElementById("salvar-modelo").addEventListener("click", async function(event){
    event.preventDefault();
    const nome = document.getElementById("nome-modelo").value;
    const fabricante = document.getElementById("fabricante-modelo").value;
    const novoModelo = {nome: nome, fabricante: {id: fabricante}};   

    let resultado;
    if(modeloEmEdicao){
        // Modo de edição - usa PUT
        resultado = await putData(`http://localhost:8080/api/modelos/${modeloEmEdicao}`, novoModelo);
    }else {
        // Modo de criação - usa POST
        resultado = await postData("http://localhost:8080/api/modelos", novoModelo);
    }
    if(!isSucess(resultado)){
        alert("Modelo salvo com sucesso!");
        document.getElementById("nome-modelo").value = "";
        document.getElementById("fabricante-modelo").value = "";
        MODAL.style.display = "none";

        setRemoverElementos(".tabela-dados");
        document.querySelector("#modelos").style.display = "block";
        const dadosModelos = await getData("http://localhost:8080/api/modelos");
        document.querySelector("#modelos").appendChild(criarTabelaModelo(dadosModelos));
    
    }else{
        alert ("Erro ao salvar modelo. erro: " + resultado.message);
    }

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
