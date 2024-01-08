import { Component, Input } from '@angular/core';
import { SMALL_GROUP_LOADED } from 'src/app/events';
import { openFullScreen } from 'src/app/helpers/general';
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
  isSaving = false;
  saveButtonClass = "button_disabled";
  
  constructor(private hub: HubService, private groupService: GroupService, public intl:TranslateService){    
    hub.subscribe(SMALL_GROUP_LOADED, (args: any) => {      
      this.group = args;
      this.participants = args.participants ? [...args.participants] : [];
    });

    this.group = this.groupService.group;
    this.participants = this.groupService.group.participants ? [... this.groupService.group.participants] : [];

    if (!this.group.id || !this.group.name){
      this.loadGroupInfo();
    }
  }

  async loadGroupInfo(){
    const res = await this.groupService.getGroupInfo();
    this.group = res;
    this.participants = res.participants ? [...res.participants] : [];
  }

  checkIfParticipantsNeedToBeUpdated(){    
    if (this.participants.length !== this.group.participants){
      this.saveButtonClass = "";
      return true;
    }
    else {
      for(let part of this.participants){
        let relatedPart = this.group.participants.filter((x: participant) => x.id === part.id);
        if(!relatedPart){
          this.saveButtonClass = "";
          return true;
        }

        if (part.name !== relatedPart.name || part.alias !== relatedPart.alias){
          this.saveButtonClass = "";
          return true;
        }
      }
    }

    this.saveButtonClass = "button_disabled";
    return false;
  }

  addNewParticipant(){
    this.participants.push(createEmptyParticipant());
    this.checkIfParticipantsNeedToBeUpdated();
  }

  deleteParticipant(participant: participant){
    this.participants = this.participants.filter(x => x.id !== participant.id);
    this.checkIfParticipantsNeedToBeUpdated();
  }

  async saveParticipants(){
    if (!this.saveButtonClass){
      this.isSaving = true;
      const res = await this.groupService.updateGroupParticipants(this.participants);
      this.isSaving = false;
    }
  }
  

}
