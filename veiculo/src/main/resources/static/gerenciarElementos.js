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