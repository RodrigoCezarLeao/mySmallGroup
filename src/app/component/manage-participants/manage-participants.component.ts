import { Component } from '@angular/core';
import { SMALL_GROUP_LOADED } from 'src/app/events';
import { emptyGroup, group } from 'src/app/interface/group';
import { HubService } from 'src/app/service/hub.service';

@Component({
  selector: 'app-manage-participants',
  templateUrl: './manage-participants.component.html',
  styleUrls: ['./manage-participants.component.css']
})
export class ManageParticipantsComponent {
  group: group = emptyGroup;
  constructor(private hub: HubService){
    this.hub.subscribe(SMALL_GROUP_LOADED, (args: group) => { 
      this.group = args 
    });
  }
}
