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

async function setDeletar (url){
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

async function setPost(url){
    try{
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(fabricante),
    });
    if (!response.ok){
        return {sucess: true, message: "Criado com Sucesso"};
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
