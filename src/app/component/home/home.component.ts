import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { checkIfLoggedIn, clearTokens, getsavedTokensInSessionStorage } from 'src/app/helpers/base_request';
import { emptyGroup, group } from 'src/app/interface/group';
import { GroupService } from 'src/app/service/group.service';
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
  editTitle = false;

  constructor(private router: Router, private groupService: GroupService, public intl: TranslateService){
    if (!checkIfLoggedIn())
      this.router.navigate(["/"]);
    else
      this.getGroup();
  }

  async getGroup(){
    const resp = await this.groupService.getGroupInfo();
    this.group = resp;
  }

  logout(){
    clearTokens();
    this.router.navigate(["/"]);
  }

  // Small Group Title
  editSmallGroupTitle(){
    this.newGroupTitle = this.group.name; 
    this.editTitle = true; 
    setTimeout(() => this.editTitleInput.nativeElement.focus(), 100);
  }
  handleSmallGroupTitleTyping(event: KeyboardEvent){
    if (event.key === "Enter")
      this.updateSmallGroupTitle();
  }
  cancelSmallGroupTitleEdition(){
    this.editTitle = false;
  }
  async updateSmallGroupTitle(){
    if (!this.newGroupTitle){
      return;
    }

    if (this.newGroupTitle === this.group.name)
      return;

    if(confirm(this.intl.translateWithParams("alert_confirm_small_group_title_edition", [this.group.name, this.newGroupTitle]))){
      const res = await this.groupService.updateGroupName(this.newGroupTitle);
      const token = getsavedTokensInSessionStorage();

      if (res.id === token.groupID){
        // this.cancelSmallGroupTitleEdition();
        location.reload();
      }      
    }
  }
}
