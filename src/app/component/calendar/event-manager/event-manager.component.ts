import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CLOSE_SHUFFLE_DIALOG, EDIT_EVENT, OPEN_SHUFFLE_DIALOG, RETURN_EDIT_EVENT_PAGE } from 'src/app/events';
import { createEmptyEvent, event } from 'src/app/interface/event';
import { emptyGroup, group } from 'src/app/interface/group';
import { participant } from 'src/app/interface/participant';
import { GroupService } from 'src/app/service/group.service';
import { HubService } from 'src/app/service/hub.service';
import { TranslateService } from 'src/app/service/translate.service';
import { MatDialog } from '@angular/material/dialog';
import { ShuffleDialogComponent } from '../shuffle-dialog/shuffle-dialog.component';

@Component({
  selector: 'app-event-manager',
  templateUrl: './event-manager.component.html',
  styleUrls: ['./event-manager.component.css']
})
export class EventManagerComponent {  
  group: group = emptyGroup;
  event: event = createEmptyEvent();  
  isSaving = false;
  shuffleViewOrUpdate = false;
  
  constructor(public groupService: GroupService, public router: Router, public intl: TranslateService, private hub: HubService, public dialog: MatDialog){
    this.hub.subscribe(EDIT_EVENT, (args: event) => {
      this.event = args
    });
    this.hub.subscribe(CLOSE_SHUFFLE_DIALOG, () => this.dialog.closeAll());
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
    if (!this.isButtonDisabled()){
      this.hub.notify(CLOSE_SHUFFLE_DIALOG);
      this.isSaving = true;
      const newEventsList = structuredClone(this.group.events) ?? [];
  
      if (!newEventsList.find((x: event) => x.id === this.event.id))
        newEventsList.push(this.event);
  
      await this.groupService.updateEvent(newEventsList);
      this.isSaving = false;
    }
  }
  
  isButtonDisabled(){
    if (this.event.title && this.event.dateStr)
      return false;
    
    return true;
  }

  returnPage(){
    setTimeout(() => this.hub.notifyArgs(RETURN_EDIT_EVENT_PAGE, this.event.dateStr), 50);
    this.hub.notify(CLOSE_SHUFFLE_DIALOG);
    this.router.navigate(['/calendar']);
  }

  shuffleParticipants(){    


    const shuffle = (array: string[]) => { 
      for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]];
      } 
      return array; 
    }; 

    if (this.shuffleViewOrUpdate)
      this.event.presence = shuffle(this.event.presence);

    let desc = "";
    for(let i = 0; i < this.event.presence.length; i++){
      if (i < this.event.presence.length - 1){
        const part = this.group.participants.find(x => x.id === this.event.presence[i])
        const nexPart = this.group.participants.find(x => x.id === this.event.presence[i + 1]);
  
        if (part){
          desc += `${part?.name} ora por ${nexPart?.name}\n`;
        }
      }else if (i === this.event.presence.length - 1){
        const part = this.group.participants.find(x => x.id === this.event.presence[i])
        const nexPart = this.group.participants.find(x => x.id === this.event.presence[0]);

        if (part){
          desc += `${part?.name} ora por ${nexPart?.name}\n`;
        }
      }
    }


    // if(this.event.description.includes("-----\n\n"))
    //   this.event.description = this.event.description.split("-----\n\n")[0] + "-----\n\n" + desc;
    // else
    //   this.event.description = "-----\n\n" + desc;

    
    this.dialog.open(ShuffleDialogComponent, {width: '350px', position: {top: '-200px', right: '-150px'}});    
    this.hub.notifyArgs(OPEN_SHUFFLE_DIALOG, desc);
  }

}
