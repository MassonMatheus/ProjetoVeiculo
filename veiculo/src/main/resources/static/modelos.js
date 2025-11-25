const criarTabelaModelo = function(dados){
    const tabela = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // Criar cabeçalho da tabela
    const trTittle = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = "Modelos";
    th.colSpan = 4; // Ajuste conforme o número de colunas
    trTittle.appendChild(th);
    thead.appendChild(trTittle);

    const cabecalho = ["Modelos", "Fabricante", "País de Origem", "Ações"];
    const tr = document.createElement("tr");
    cabecalho.forEach(function(coluna){
        const th = document.createElement("th");
        th.textContent = coluna;
        tr.appendChild(th);
    });

    // adciona classe para estilizar a tabela
    tabela.classList.add("tabela-dados");

    thead.appendChild(tr);
    tabela.appendChild(thead);

    // Criar corpo da tabela
    dados.forEach(function(item){
        const tr = document.createElement("tr");
        //Modelo
        const tdModelo = document.createElement("td");
        tdModelo.textContent = item.nome;
        tr.appendChild(tdModelo);

        //nome do fabricante
        const tdFabricante = document.createElement("td");
        tdFabricante.textContent = item.fabricante.nome;
        tr.appendChild(tdFabricante);

        //Pais de Origem
        const tdPaisOrigem = document.createElement("td");
        tdPaisOrigem.textContent = item.fabricante.paisOrigem;
        tr.appendChild(tdPaisOrigem);

        //Coluna Ações
        const tdAcoes = document.createElement("td");
        tdAcoes.style.display = "flex";
        tdAcoes.style.gap = "5px";

        //Editar
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "✏️";
        btnEditar.classList.add("btn", "edit");
        btnEditar.style.cursor = "pointer";
        btnEditar.addEventListener("click", async function(event){
              if(confirm("Deseja editar este modelo?") === true){
                await abrirModalEdicaoModelo(item);
              }
        });

        //Deletar
        const btnDeletar = document.createElement("button");
        btnDeletar.textContent = "🗑️";
        btnDeletar.classList.add("btn", "delete");
        btnDeletar.addEventListener("click", async function(event){
            if(confirm("Tem certeza que deseja deletar este modelo?") === true){
           const resultado = await setDeletar(`http://localhost:8080/api/modelos/${item.id}`);
            if(resultado.status === 204){
                this.parentElement.remove();
                alert("Modelo deletado com sucesso!");
            }else{
                alert("Erro ao deletar modelo" );
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

