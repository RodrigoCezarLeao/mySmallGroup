import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EDIT_EVENT } from 'src/app/events';
import { createEmptyEvent, event } from 'src/app/interface/event';
import { emptyGroup, group } from 'src/app/interface/group';
import { participant } from 'src/app/interface/participant';
import { GroupService } from 'src/app/service/group.service';
import { HubService } from 'src/app/service/hub.service';
import { TranslateService } from 'src/app/service/translate.service';

@Component({
  selector: 'app-event-manager',
  templateUrl: './event-manager.component.html',
  styleUrls: ['./event-manager.component.css']
})
export class EventManagerComponent {  
  group: group = emptyGroup;
  event: event = createEmptyEvent();  
  isSaving = false;

  constructor(public groupService: GroupService, public router: Router, public intl: TranslateService, private hub: HubService){
    this.hub.subscribe(EDIT_EVENT, (args: event) => this.event = args);
    this.getGroup();
  }

  async getGroup(){
    if (await this.groupService.init()){
      this.group = this.groupService.group;      
    }
  }  

  manageFrequency(participant: participant){    
    if (this.isParticipantPresent(participant))
      this.event.presence = this.event.presence.filter(x => x !== participant.id);
    else
      this.event.presence.push(participant.id);
  }
  
  isParticipantPresent(participant: participant){
    return this.event.presence.find(x => x === participant.id) ? true : false;
  }
  
  async saveEvent(){
    this.isSaving = true;
    const newEventsList = structuredClone(this.group.events) ?? [];

    if (!newEventsList.find((x: event) => x.id === this.event.id))
      newEventsList.push(this.event);

    await this.groupService.updateEvent(newEventsList);
    this.isSaving = false;
  }
  
  isButtonDisabled(){
  }

}
