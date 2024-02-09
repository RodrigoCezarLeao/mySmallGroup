import { Component } from '@angular/core';
import { CLOSE_DIALOG, OPEN_PRESENCE_DIALOG } from 'src/app/events';
import { participant } from 'src/app/interface/participant';
import { HubService } from 'src/app/service/hub.service';
import { TranslateService } from 'src/app/service/translate.service';

@Component({
  selector: 'app-presence-dialog',
  templateUrl: './presence-dialog.component.html',
  styleUrls: ['./presence-dialog.component.css']
})
export class PresenceDialogComponent {   
  presence: string[] = [];
  updatePresence: any;
  participants: participant[] = [];
  isAliasToShow = "toggle_off";

  closeDialog(){
    this.hub.notify(CLOSE_DIALOG);
  }

  constructor(private hub: HubService, public intl: TranslateService){
    this.hub.subscribe(OPEN_PRESENCE_DIALOG, (args: any) => {
      this.presence = args.presence;
      this.updatePresence = args.updatePresence;
      this.participants = args.participants;
    });
  }

  toggleFlagName() {
    if(this.isAliasToShow === "toggle_off")
      this.isAliasToShow = "toggle_on";
    else
      this.isAliasToShow = "toggle_off";
  }


  isParticipantPresent(participant: participant){
    return this.presence.find(x => x === participant.id) ? true : false;
  }

  manageFrequency(participant: participant){    
    if (this.isParticipantPresent(participant))
      this.presence = this.presence.filter(x => x !== participant.id);
    else
      this.presence.push(participant.id);
  }
}
