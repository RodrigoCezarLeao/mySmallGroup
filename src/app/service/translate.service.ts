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
    "events_view_sunday": {
      "pt-br": "Dom",
      "en-us": "Sun",
    },
    "events_view_monday": {
      "pt-br": "Seg",
      "en-us": "Mon",
    },
    "events_view_tuesday": {
      "pt-br": "Ter",
      "en-us": "Tue",
    },
    "events_view_wednesday": {
      "pt-br": "Qua",
      "en-us": "Wed",
    },
    "events_view_thursday": {
      "pt-br": "Qui",
      "en-us": "Thu",
    },
    "events_view_friday": {
      "pt-br": "Sex",
      "en-us": "Fri",
    },
    "events_view_saturday": {
      "pt-br": "Sáb",
      "en-us": "Sat",
    },
    "events_manager_title": {
      "pt-br": "Título",
      "en-us": "Title",
    },
    "events_manager_date": {
      "pt-br": "Data",
      "en-us": "Date",
    },
    "events_manager_description": {
      "pt-br": "Descrição",
      "en-us": "Description",
    },
    "events_manager_presence": {
      "pt-br": "Presença",
      "en-us": "Presence",
    },
    "events_view_edit": {
      "pt-br": "Editar",
      "en-us": "Edit",
    },
    "events_view_delete": {
      "pt-br": "Excluir",
      "en-us": "Delete",
    },
    "alert_max_participants_added": {
      "pt-br": "A quantidade máxima de participantes é 30.",
      "en-us": "The max size of participants is 30.",
    },
    "toggle_shuffle_participants": {
      "pt-br": "Visualizar [ ] / Sortear [ X ]",
      "en-us": "Visualize [ ] / Shuffle [ X ]",
    },
    "report_filter_start_date": {
      "pt-br": "Data inicial",
      "en-us": "Start date",
    },
    "report_filter_final_date": {
      "pt-br": "Data final",
      "en-us": "Final date",
    },
    "report_filter_fullname_flag": {
      "pt-br": "Flag Nome?",
      "en-us": "Name flag?",
    },
    "report_table_column_participant": {
      "pt-br": "Part.",
      "en-us": "Part.",
    },
    "report_table_column_frequency": {
      "pt-br": "Freq.",
      "en-us": "Freq.",
    },
    "shuffle_dialog_date_of_shuffle": {
      "pt-br": "Sorteio de @var",
      "en-us": "Shuffle date: @var",
    },
    "settings_shuffle_event_connector": {
      "pt-br": "Palavra de conexão do sorteio: ",
      "en-us": "Shuffle connector word: ",
    },
    "settings_shuffle_dialog_font_size": {
      "pt-br": "Tamanho da fonte do sorteio: ",
      "en-us": "Shuffle font size: ",
    },
    "alert_confirm_delete_event": {
      "pt-br": "Deseja excluir o evento do dia @var? ",
      "en-us": "Do you want to delete the event of @var?",
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
