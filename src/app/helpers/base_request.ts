import { apiUrl } from "env";
import { openFullScreen } from "./general";

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
        openFullScreen();
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
        openFullScreen();
        return error;
    }
}


const API_URL_TOKEN = "mysmallgroup_apiurl";
const AUTH_TOKEN = "mysmallgroup_authtoken";
const GROUP_ID = "mysmallgroup_groupid";

export const saveTokensInSessionStorage = (token: Record<string, string>) => {
    if (token['apiURL'] && token['authToken'] && token['groupID']){
        sessionStorage.setItem(API_URL_TOKEN, token['apiURL']);
        sessionStorage.setItem(AUTH_TOKEN, token['authToken']);
        sessionStorage.setItem(GROUP_ID, token['groupID']);
    }
}

export const getsavedTokensInSessionStorage = () => {
    const apiUrl = sessionStorage.getItem(API_URL_TOKEN) ?? "";
    const authToken = sessionStorage.getItem(AUTH_TOKEN) ?? "";
    const groupID = sessionStorage.getItem(GROUP_ID) ?? "";

    return {apiUrl: apiUrl, authToken: authToken, groupID: groupID};
}

export const clearTokens = () => {
    sessionStorage.removeItem(API_URL_TOKEN);
    sessionStorage.removeItem(AUTH_TOKEN);
    sessionStorage.removeItem(GROUP_ID);
}

export const checkIfLoggedIn = () => {
    const token = getsavedTokensInSessionStorage();

    if (!token.apiUrl?.includes("https://") || !token.authToken || !token.groupID)
        return false;

    return true;
}