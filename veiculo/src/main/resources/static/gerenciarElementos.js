const criarTabela = function(dados, titulo = "Tabela", classe){
    const tabela = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    
    const cabecalho = Object.keys(dados[0]);

    const trTitle = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = titulo;
    th.colSpan = cabecalho.length;
    trTitle.appendChild(th);
    thead.appendChild(trTitle);

    const tr = document.createElement("tr");

    cabecalho.forEach(function(campo){
        const th = document.createElement("th")
        th.textContent = campo;
        tr.appendChild(th);
    });

    tabela.classList.add(classe);    

    thead.appendChild(tr);
    tabela.appendChild(thead);

    //cria o corpo da tabela
    dados.forEach(function(item){
        const tr = document.createElement("tr");
        cabecalho.forEach(function(campo){
            const td = document.createElement("td");
            td.textContent = item[campo];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    tabela.appendChild(tbody);
    return tabela;
}

const setMostrarOcultarElemento = function(esconder, elemento){
    document.querySelectorAll(elemento).forEach(function(section){
        section.style.display = esconder ? "none" : "block";

    });
}

const setRemoverElementos = function(seletor){
    document.querySelectorAll(seletor).forEach(function(elemento){
        elemento.remove();
    });
}