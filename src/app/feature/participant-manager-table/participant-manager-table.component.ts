import { Component, Input } from '@angular/core';
import { SMALL_GROUP_LOADED } from 'src/app/events';
import { emptyGroup, group } from 'src/app/interface/group';
import { createEmptyParticipant, participant } from 'src/app/interface/participant';
import { GroupService } from 'src/app/service/group.service';
import { HubService } from 'src/app/service/hub.service';
import { TranslateService } from 'src/app/service/translate.service';

@Component({
  selector: 'app-participant-manager-table',
  templateUrl: './participant-manager-table.component.html',
  styleUrls: ['./participant-manager-table.component.css']
})
export class ParticipantManagerTableComponent {
  group: group = emptyGroup;
  participants: participant[] = [];
  
  constructor(private hub: HubService, private groupService: GroupService, public intl:TranslateService){    
    hub.subscribe(SMALL_GROUP_LOADED, (args: any) => {      
      this.group = args;
      this.participants = args.participants ?? [];
    });
    this.group = this.groupService.group;
    this.participants = this.groupService.group.participants ?? [];
  }

  addNewParticipant(){
    this.participants.push(createEmptyParticipant());
  }

  deleteParticipant(participant: participant){
    if(confirm(this.intl.translateWithParams("participant_manager_table_confirm_participant_delete", [participant.name])))
      this.participants = this.participants.filter(x => x.id !== participant.id);
  }

  async saveParticipants(){    
    const res = await this.groupService.updateGroupParticipants(this.participants);
    if (res)
      alert(this.intl.translate("participant_manager_table_success_participant_update"));
  }
  

}
