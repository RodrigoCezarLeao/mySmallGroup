import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { checkIfLoggedIn, clearTokens } from 'src/app/helpers/base_request';
import { emptyGroup, group } from 'src/app/interface/group';
import { GroupService } from 'src/app/service/group.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  group: group = emptyGroup;

  constructor(private router: Router, private groupService: GroupService){
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
}
