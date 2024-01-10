import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  language: string;
  
  constructor() {
    this.language = this.getCachedLanguage() ?? 'pt-br';
   }

  getCachedLanguage(){
    return localStorage.getItem('mysmallgroup-language');
  }

  setCacheLanguage(lang: string){
    localStorage.setItem('mysmallgroup-language', lang);
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
    "invalid_password": {
      "pt-br": "Senha inválida!",
      "en-us": "Invalid Password!",
    },
    "success_password": {
      "pt-br": "Sucesso!",
      "en-us": "Success!",
    },
    "alert_confirm_small_group_title_edition": {
      "pt-br": "Deseja trocar o nome do grupo de '@var' para '@var'?",
      "en-us": "Confirm small group name from '@var' to '@var'?",
    },
    "button_add": {
      "pt-br": "Adicionar",
      "en-us": "Add",
    },
    "button_save": {
      "pt-br": "Salvar",
      "en-us": "Save",
    },
    "manage_participant_table_name_column": {
      "pt-br": "Nome",
      "en-us": "Name",
    },
    "manage_participant_table_alias_column": {
      "pt-br": "Apelido",
      "en-us": "Nickname",
    },
    "manage_participant_table_action_column": {
      "pt-br": "Ação",
      "en-us": "Action",
    },
    "manage_participant_table_confirm_participant_delete": {
      "pt-br": "Deseja deletar o parcipante de nome: '@var'?",
      "en-us": "Confirm participant's '@var' deletion?",
    },
    "manage_participant_table_success_participant_update": {
      "pt-br": "Lista de participantes atualizada com sucesso!",
      "en-us": "Participants updated successfully!",
    },
    "settings_group_title": {
      "pt-br": "Nome do grupo:",
      "en-us": "Group's name:",
    },
    "manage_participant_table_role_column": {
      "pt-br": "Papel",
      "en-us": "Role",
    },
    "manage_participant_table_leader_role": {
      "pt-br": "Líder",
      "en-us": "Leader",
    },
    "manage_participant_table_member_role": {
      "pt-br": "Membro",
      "en-us": "Member",
    },
    "manage_participant_table_guest_role": {
      "pt-br": "Visitante",
      "en-us": "Guest",
    },
    // No use
    "alert_error_empty_title_edition": {
      "pt-br": "O campo do título está vazio.",
      "en-us": "Title field is empty.",
    },
    "": {
      "pt-br": "",
      "en-us": "",
    },
  };
}
