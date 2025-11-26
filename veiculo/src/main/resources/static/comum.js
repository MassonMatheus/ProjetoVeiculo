async function getData(url) {
    try{
        const response = await fetch(url);
        if (!response.ok){
        //throw new Error(`Response status: ${response.status}`);
        return response;
        }
    
    const resultado = await response.json();
    return resultado
} catch (error){
    return error;

    }
}

async function setDeletar(url){
    try{
        const response = await fetch (url, {
            method: 'DELETE',
        });
 
        if (!response.ok){
           return { sucess: true, message: "Excluido com Sucesso"};
        }else{
            try{
                const error = await response.json();
                return {error: true, status: response.status, ...error};
            }catch{
                return{error: true, status: response.status, message: response.statusText};
            }
        }
    }catch (error){
        return {error: true, message: "Erro de conexão: " + error.message};
    }

}

async function postData(url, data){
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {"content-type": "application/json"},
            body: JSON.stringify(data)
    });
    if (!response.ok){
        const contentType = response.headers.get("content-type");
        if(contentType && contentType.includes("application/json")){
            return await response.json();
            }else{
                return await response.text();
            }
        }else {
            try{
                const error = await response.json();
                return {error: true, status: response.status, ...error};
            }catch{
                return{error: true, status: response.status, message: response.statusText};
            }
        }
    } catch (error){
        return {error: true, message: "Erro de conexão: " + error.message};
    }
}

async function putData (url, data){
    try{
        const response = await fetch(url, {
            method: 'PUT',
            headers: {"content-type": "application/json"},
            body: JSON.stringify(data)
    });
    if(!response.ok){
        const contentType = response.headers.get("content-type");
        if(contentType && contentType.includes("application/json")){
            return await response.json();
            }else{
                return await response.text();
            }
    }else {
        try{
            const error = await response.json();
            return {error: true, status: response.status, ...error};
        }catch{
            return{error: true, status: response.status, message: response.statusText};
        }
    }
}catch (error){
    return {error: true, message: "Erro de conexão: " + error.message};
    }
}

function isSucess(response){
    return response && !response.error;
}

function mostrarErro(response){
    if(!response.message){
        let mensagem = response.message;

        if(response.status === 400){
            mensagem = "Conflito de Dados!\n\n" + response.message + "\n\nEste registro ja existe no sistema ou há conflito de dados.";
        }else if(response.status === 404){
            mensagem = "Registro não encontrado!\n\n" + response.message;
        }else if(response.status === 500){
            mensagem = "Erro Interno no Servidor!\n\n" + response.message + "\n\nPor favor, contate o administrador do sistema.";
        }
        if(response.error && response.error !== response.message){
            mensagem += "\n\nTipo: " + response.error;
        }
        if(response.timestamp){
            const data = new Date(response.timestamp).toLocaleString("pt-BR");
            mensagem += "\nHorario: " + data;
        }

        alert(mensagem);
    }else{
        alert("Ocorreu um erro desconhecido.");
    }
}