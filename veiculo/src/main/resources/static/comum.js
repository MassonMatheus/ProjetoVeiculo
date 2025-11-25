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