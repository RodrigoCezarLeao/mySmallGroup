import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CLOSE_IMG_DIALOG_DELETE, CLOSE_SHUFFLE_DIALOG, EDIT_EVENT, OPEN_DESC_DIALOG, OPEN_IMG_DIALOG, OPEN_PRESENCE_DIALOG, OPEN_SHUFFLE_DIALOG, RETURN_EDIT_EVENT_PAGE } from 'src/app/events';
import { createEmptyEvent, event } from 'src/app/interface/event';
import { emptyGroup, group } from 'src/app/interface/group';
import { participant } from 'src/app/interface/participant';
import { GroupService } from 'src/app/service/group.service';
import { HubService } from 'src/app/service/hub.service';
import { TranslateService } from 'src/app/service/translate.service';
import { MatDialog } from '@angular/material/dialog';
import { ShuffleDialogComponent } from '../shuffle-dialog/shuffle-dialog.component';
import { formatDayMonthYear } from 'src/app/helpers/date_time';
import { EventphotoService } from 'src/app/service/eventphoto.service';
import { ImgDialogComponent } from '../img-dialog/img-dialog.component';
import { DescriptionDialogComponent } from '../description-dialog/description-dialog.component';
import { PresenceDialogComponent } from '../presence-dialog/presence-dialog.component';

@Component({
  selector: 'app-event-manager',
  templateUrl: './event-manager.component.html',
  styleUrls: ['./event-manager.component.css']
})
export class EventManagerComponent {  
  @ViewChild("files") files: any;

  group: group = emptyGroup;
  event: event = createEmptyEvent();  
  isSaving = false;
  shuffleViewOrUpdate = false;  
  imgUrls: any;
  
  constructor(public groupService: GroupService, public router: Router, public intl: TranslateService, private hub: HubService, public dialog: MatDialog, private eventPhotoService: EventphotoService){
    this.hub.subscribe(EDIT_EVENT, (args: event) => {
      this.event = args
      this.getImgs();
    });
    this.hub.subscribe(CLOSE_SHUFFLE_DIALOG, () => this.dialog.closeAll());
    this.getGroup();
  }
  
  async getImgs(){    
    if (this.event.id && this.event.title){
      this.imgUrls = await this.eventPhotoService.getEventPhotos(this.event.id);
    }
  }

  async saveImgs(){
    this.isSaving = true;
    let files = this.files.nativeElement.files;
    
    for(let file of files){
      const form = new FormData();
      form.append('fileUpload', file);
      let res = await this.eventPhotoService.uploadAsset(form, this.event.id);
      this.imgUrls.push(res);
    }    
    
    this.isSaving = false;
  }
  
  async getGroup(){
    if (await this.groupService.init()){
      this.group = this.groupService.group;
    }
  }  
  
  async saveEvent(){
    if (!this.isButtonDisabled()){
      this.hub.notify(CLOSE_SHUFFLE_DIALOG);
      this.isSaving = true;
      let newEventsList = structuredClone(this.group.events) ?? [];
  
      if (!newEventsList.find((x: event) => x.id === this.event.id)){
        newEventsList.push(this.event);
        newEventsList = newEventsList.sort((a: event, b:  event) => a.dateStr > b.dateStr ? 1 : -1);
      }
  
      await this.groupService.updateEvent(newEventsList);

      await this.saveImgs();

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
    
    let fDate = formatDayMonthYear(new Date(this.event.dateStr + "T00:00"));
    let desc = `${this.intl.translateWithParams("shuffle_dialog_date_of_shuffle", [fDate])}\n`;

    for(let i = 0; i < this.event.presence.length; i++){
      if (i < this.event.presence.length - 1){
        const part = this.group.participants.find(x => x.id === this.event.presence[i])
        const nextPart = this.group.participants.find(x => x.id === this.event.presence[i + 1]);
  
        if (part){
          desc += `${part?.role === "guest" ? part?.name + "*" : part?.name} ${this.group.template["shuffle_connector_word"]} ${nextPart?.role === "guest" ? nextPart?.name + "*" :nextPart?.name}\n`;
        }
      }else if (i === this.event.presence.length - 1){
        const part = this.group.participants.find(x => x.id === this.event.presence[i])
        const nextPart = this.group.participants.find(x => x.id === this.event.presence[0]);

        if (part){
          desc += `${part?.role === "guest" ? part?.name + "*" : part?.name} ${this.group.template["shuffle_connector_word"]} ${nextPart?.role === "guest" ? nextPart?.name + "*" :nextPart?.name}\n`;
        }
      }
    }
    
    this.dialog.open(ShuffleDialogComponent, {width: '350px', position: {top: '-200px', right: '-150px'}});    
    this.hub.notifyArgs(OPEN_SHUFFLE_DIALOG, {desc: desc, template: this.group.template});
  }

  openImgModal(img: any){
    this.dialog.open(ImgDialogComponent, {width: '350px'});
    this.hub.notifyArgs(OPEN_IMG_DIALOG, {imgUrl: img.url, imgId: img.id});
    this.hub.subscribe(CLOSE_IMG_DIALOG_DELETE, (args: any) => {
      this.imgUrls = this.imgUrls.filter((x: any) => x.id !== args[0]);
      this.dialog.closeAll();
    });
  }

  openDescriptionModal(){
    this.dialog.open(DescriptionDialogComponent, {width: '350px'});    
    this.hub.notifyArgs(OPEN_DESC_DIALOG, {desc: this.event.description, updateDesc: (newDesc: string) => {
      this.event.description = newDesc;
    }});
  }
  
  openPresenceModal(){
    this.dialog.open(PresenceDialogComponent, {width: '350px'});    
    this.hub.notifyArgs(OPEN_PRESENCE_DIALOG, {presence: this.event.presence, participants: this.group.participants, updatepresence: (newPresence: string[]) => {
      this.event.presence = newPresence;
    }});
  }

}
