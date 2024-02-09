import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EDIT_EVENT, OPEN_DESC_DIALOG, RETURN_EDIT_EVENT_PAGE, OPEN_DIALOG } from 'src/app/events';
import { firstDayOfMonth, formatDayMonthYear, formatMonthYear, formatYearMonthDay, howManyDaysInMonth, isItToday } from 'src/app/helpers/date_time';
import { createEmptyEvent, event } from 'src/app/interface/event';
import { emptyGroup, group } from 'src/app/interface/group';
import { GroupService } from 'src/app/service/group.service';
import { HubService } from 'src/app/service/hub.service';
import { TranslateService } from 'src/app/service/translate.service';
import { DescriptionDialogComponent } from '../description-dialog/description-dialog.component';

@Component({
  selector: 'app-events-view',
  templateUrl: './events-view.component.html',
  styleUrls: ['./events-view.component.css']
})
export class EventsViewComponent {
  group: group = emptyGroup;
  dayEvents: event[] = [];
  referenceDate = new Date();
  daysLabels: string[] = [];
  formatMonthYear = formatMonthYear;
  
  constructor(public intl: TranslateService, private router: Router, private groupService: GroupService, private hub: HubService, public dialog: MatDialog){
    this.getGroup();
    this.generateCalendarMonthLabels();
    this.handleCalendarClick(this.referenceDate.getDate().toString());
    
    this.hub.subscribe(RETURN_EDIT_EVENT_PAGE, (args: string) => {      
      if (!args.includes(":")){
        this.referenceDate = new Date(args + " 00:00");
        this.generateCalendarMonthLabels();
        setTimeout(() => this.handleCalendarClick(this.referenceDate.getDate().toString()), 50);
      }
      
    });
  }

  formatTitleDate(){
    return formatDayMonthYear(this.referenceDate);
  }

  handleCalendarClick(day: string){
    if(day !== '-'){
      this.referenceDate = new Date(this.referenceDate.getFullYear(), this.referenceDate.getMonth(), Number(day));
      const formattedReferenceDate = formatYearMonthDay(this.referenceDate);
      this.dayEvents = this.group.events.filter(x => x.dateStr === formattedReferenceDate);      
    }else {
      this.dayEvents = [];
    }
  }

  async getGroup(){
    if (await this.groupService.init()){
      this.group = this.groupService.group;
      this.handleCalendarClick(this.referenceDate.getDate().toString());
    }
  }  

  generateCalendarMonthLabels(){
    this.daysLabels = [];

    const daysInMonth = howManyDaysInMonth(this.referenceDate);
    const indexFirstDay = firstDayOfMonth(this.referenceDate);
    
    this.daysLabels.push(this.intl.translate("events_view_sunday"));
    this.daysLabels.push(this.intl.translate("events_view_monday"));
    this.daysLabels.push(this.intl.translate("events_view_tuesday"));
    this.daysLabels.push(this.intl.translate("events_view_wednesday"));
    this.daysLabels.push(this.intl.translate("events_view_thursday"));
    this.daysLabels.push(this.intl.translate("events_view_friday"));
    this.daysLabels.push(this.intl.translate("events_view_saturday"));
    

    // 6 weeks / 7 days per week
    let cont = 1;
    for(let i=0; i<6*7; i++){
      if(i < indexFirstDay || i > daysInMonth + indexFirstDay - 1)
        this.daysLabels.push("-");
      else{
        this.daysLabels.push(cont.toString());
        cont++;
      }
    }
  }

  addMonth(flag: number){
    this.referenceDate = new Date(this.referenceDate.getFullYear(), this.referenceDate.getMonth() + flag, 1);
    this.generateCalendarMonthLabels();
  }

  isItReferenceDay(day: string){    
    return isItToday(day, this.referenceDate);
  }

  isItExcess(i: number){
    if (this.daysLabels[i] === "-")
      return true;
    return false;
  }

  isThereEventToday(day: string){
    const auxDate =  formatYearMonthDay(this.referenceDate).slice(0,8) + day.padStart(2, "0");
    const auxArray = this.group.events.filter(x => x.dateStr === auxDate);    
    if (auxArray.length > 0)
      return true;

    return false;
  }

  addNewEvent(){    
    const emptyEvent = createEmptyEvent();
    emptyEvent.dateStr = formatYearMonthDay(this.referenceDate);
    setTimeout(() => this.hub.notifyArgs(EDIT_EVENT, emptyEvent), 50);
    this.router.navigate(["/calendar_event"]);
  }

  editEvent(event: event){
    setTimeout(() => this.hub.notifyArgs(EDIT_EVENT, event), 50);
    this.router.navigate(["/calendar_event"]);
  }

  async deleteEvent(event: event){    
    if (confirm(this.intl.translateWithParams("alert_confirm_delete_event", [event.dateStr]))){
      const newEventsList = this.group.events.filter(x => x.id !== event.id);
      await this.groupService.updateEvent(newEventsList);
      this.group.events = newEventsList;
      this.handleCalendarClick(this.referenceDate.getDate().toString());
    }
  }

  openDescModal(event: event){
    this.hub.notifyArgs(OPEN_DIALOG, {
      component: DescriptionDialogComponent, 
      data: {
        desc: event.description, 
        updateDesc: false
      }
    })
  }

}
