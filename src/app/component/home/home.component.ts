import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SMALL_GROUP_LOADED } from 'src/app/events';
import { checkIfLoggedIn, clearTokens, getsavedTokensInSessionStorage } from 'src/app/helpers/base_request';
import { emptyGroup, group } from 'src/app/interface/group';
import { GroupService } from 'src/app/service/group.service';
import { HubService } from 'src/app/service/hub.service';
import { TranslateService } from 'src/app/service/translate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild("editTitleInput") editTitleInput: any;
  
  group: group = emptyGroup;
  newGroupTitle = "";
  isUpdatingTitle = false;

  constructor(private router: Router, 
    private groupService: GroupService, public intl: TranslateService, private hub: HubService
    ){
    if (!checkIfLoggedIn())
      this.router.navigate(["/"]);
    else
      this.getGroup();
  }

  async getGroup(){
    const resp = await this.groupService.getGroupInfo();
    this.group = resp;
    this.newGroupTitle = resp.name;
    this.hub.notifyArgs(SMALL_GROUP_LOADED, resp);
  }

  logout(){
    clearTokens();
    this.router.navigate(["/"]);
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

    
    if(confirm(this.intl.translateWithParams("alert_confirm_small_group_title_edition", [this.group.name, this.newGroupTitle]))){
      this.isUpdatingTitle = true;

      const res = await this.groupService.updateGroupName(this.newGroupTitle);
      const token = getsavedTokensInSessionStorage();

      if (res.id === token.groupID){
        this.group.name = this.newGroupTitle;
      }

      this.editTitleInput.nativeElement.blur();
      this.isUpdatingTitle = false;
    }
  }
}
