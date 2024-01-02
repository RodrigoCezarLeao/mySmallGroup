import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  language: string = "pt-br";
  
  // constructor(private hubService: HubService) {
  //   this.language = this.getCachedLanguage() ?? 'pt-br';
  //  }

  getCachedLanguage(){
    return localStorage.getItem('cashier-language');
  }

  setCacheLanguage(lang: string){
    localStorage.setItem('cashier-language', lang);
  }

 translate(key: string){  
    return this.intl[key][this.language];
  }
  
  translateWithParams(key:string, args: string[]){
    let text = this.translate(key);
    for(let elem of args){
      text = text.replace('@var', elem);
    }
    return text;
  }

  changeLanguage(language: string){
    this.setCacheLanguage(language);
    this.language = language;
  }

  intl: Record<string, Record<string, string>> = {    
    "login_password": {
      "pt-br": "Senha: ",
      "en-us": "Password: ",
    },
    "login_entry_button": {
      "pt-br": "Entrar",
      "en-us": "Log in",
    },
    "": {
      "pt-br": "",
      "en-us": "",
    },
  };
}
