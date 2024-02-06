import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SMALL_GROUP_LOADED } from 'src/app/events';
import { checkIfLoggedIn, clearTokens, getsavedTokensInSessionStorage } from 'src/app/helpers/base_request';
import { emptyGroup, group } from 'src/app/interface/group';
import { GroupService } from 'src/app/service/group.service';
import { HubService } from 'src/app/service/hub.service';
import { TranslateService } from 'src/app/service/translate.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  @ViewChild("editTitleInput") editTitleInput: any;
  @ViewChild("editTemplateInput") editTemplateInput: any;
  
  group: group = emptyGroup;
  newGroupTitle = "";
  isUpdatingTitle = false;

  constructor(private router: Router, 
    private groupService: GroupService, public intl: TranslateService, private hub: HubService
    ){
    if (!checkIfLoggedIn())
      this.router.navigate(["/"]);
    
    this.getGroup();
  }

  async getGroup(){
    if (await this.groupService.init()){
      this.group = this.groupService.group;
      this.newGroupTitle = this.group.name;
    }
  }

  logout(){
    this.groupService.group = emptyGroup;
    clearTokens();
    this.router.navigate(["/"]);
  }

  changeLanguage(lang: string){
    this.intl.changeLanguage(lang);
  }

  // Small Group Title
  
  handleSmallGroupTitleTyping(event: KeyboardEvent){
    if (event.key === "Enter")
      this.updateSmallGroupTitle();
  }  
  async updateSmallGroupTitle(){
    if (!this.newGroupTitle)
      return;    

    if (this.newGroupTitle === this.group.name)
      return;

    this.isUpdatingTitle = true;

    const res = await this.groupService.updateGroupName(this.newGroupTitle);
    const token = getsavedTokensInSessionStorage();

    if (res.id === token.groupID){
      this.group.name = this.newGroupTitle;
    }

    this.editTitleInput.nativeElement.blur();
    this.isUpdatingTitle = false;    
  }

  async updateSmallGroupTemplate(){    
    this.isUpdatingTitle = true;

    const res = await this.groupService.updateTemplate(this.group.template);
    const token = getsavedTokensInSessionStorage();

    this.editTemplateInput.nativeElement.blur();
    this.isUpdatingTitle = false;    
  }

  async updateAll(){
    await this.updateSmallGroupTitle();
    await this.updateSmallGroupTemplate();
  }
}
