const criarTabela = function(dados, titulo = "Tabela", classe){
    const tabela = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const trTitle = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = "Fabricantes";
    th.colSpan = 5;
    trTitle.appendChild(th);
    thead.appendChild(trTitle);

    const cabecalho = ["Nome", "País de Origem", "Ações"];
    const tr = document.createElement("tr");
    cabecalho.forEach(function(campo){
        const th = document.createElement("th")
        th.textContent = campo;
        tr.appendChild(th);
    });

    tabela.classList.add("tabela-dados");    

    thead.appendChild(tr);
    tabela.appendChild(thead);

    //cria o corpo da tabela
    dados.forEach(function(item){
        const tr = document.createElement("tr");
       
        const tdNome = document.createElement("td");
        tdNome.textContent = item.nome;
        tr.appendChild(tdNome);

        const tdPaisOrigem = document.createElement("td");
        tdPaisOrigem.textContent = item.paisOrigem;
        tr.appendChild(tdPaisOrigem);

        //Coluna Ações 
        const tdAcoes = document.createElement("td");
        tdAcoes.style.display = "flex";
        tdAcoes.style.gap = "5px";

        //Botão Editar
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "✏️";
        btnEditar.classList.add("btn", "edit");
        btnEditar.style.cursor = "pointer";
        btnEditar.addEventListener("click", async function(event){
           if(confirm("Deseja editar este fabricante?") === true){
            await abrirModalEdicaoFabricante(item);
            }
        });

        //Deletar
        const btnDeletar = document.createElement("button");
        btnDeletar.textContent = "🗑️";
        btnDeletar.classList.add("btn", "delete");
        btnDeletar.addEventListener("click", async function(event){
            if(confirm("Deseja realmente deletar este fabricante?") === true){
            const resultado = await setDeletar(`http://localhost:8080/api/fabricantes/${item.id}`);
            this.parentElement.remove();
            if(resultado.status === 204){
                alert("Fabricante deletado com sucesso!");
            }else{
                alert("Erro ao deletar fabricante" );
                }
            }
        });
        tdAcoes.appendChild(btnEditar);
        tdAcoes.appendChild(btnDeletar);
        tr.appendChild(tdAcoes);
        tbody.appendChild(tr);
    });
    tabela.appendChild(tbody);
    return tabela;
}
