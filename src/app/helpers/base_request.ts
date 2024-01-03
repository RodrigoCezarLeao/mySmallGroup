import { apiUrl } from "env";

export const baseGraphCMSFetch = async (apiUrl: string, bearerToken: string, mutation: {query: string}) => {
    try {
        var data = await fetch(apiUrl, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "authorization": `Bearer ${bearerToken}`
            },
            body: JSON.stringify(mutation)
        }).then(resp => resp.json());
    
        return data;
    }catch(error){
        alert(error);
    }
}

export const getInfo = async (payload: string) => {
    try {
        var data = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({payload: payload}),
        }).then(resp => resp.json());

        return data;
    }catch(error){
        alert(error);
        return error;
    }
}


const API_URL_TOKEN = "mysmallgroup_apiurl";
const AUTH_TOKEN = "mysmallgroup_authtoken";

export const saveTokensInSessionStorage = (token: Record<string, string>) => {
    if (token['apiURL'] && token['authToken']){
        sessionStorage.setItem(API_URL_TOKEN, token['apiURL']);
        sessionStorage.setItem(AUTH_TOKEN, token['authToken']);
    }
}

export const getsavedTokensInSessionStorage = () => {
    const apiUrl = sessionStorage.getItem(API_URL_TOKEN);
    const authToken = sessionStorage.getItem(AUTH_TOKEN);

    return {apiUrl: apiUrl, authToken: authToken};
}

export const clearTokens = () => {
    sessionStorage.removeItem(API_URL_TOKEN);
    sessionStorage.removeItem(AUTH_TOKEN);
}
