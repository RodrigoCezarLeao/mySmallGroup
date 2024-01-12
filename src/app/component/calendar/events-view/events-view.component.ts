import { Component } from '@angular/core';
import { firstDayOfMonth, formatMonthYear, howManyDaysInMonth, isItToday } from 'src/app/helpers/date_time';
import { TranslateService } from 'src/app/service/translate.service';

@Component({
  selector: 'app-events-view',
  templateUrl: './events-view.component.html',
  styleUrls: ['./events-view.component.css']
})
export class EventsViewComponent {
  referenceDate = new Date();
  daysLabels: string[] = [];
  formatMonthYear = formatMonthYear;
  
  constructor(public intl: TranslateService){    
    this.generateCalendarMonthLabels();
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

  isItToday(day: string){    
    return this.referenceDate.getFullYear() === new Date().getFullYear() &&
          this.referenceDate.getMonth() === new Date().getMonth() ?          
            isItToday(day, new Date()) : 
            false;
  }

  isItExcess(i: number){
    if (this.daysLabels[i] === "-")
      return true;
    return false;
  }

}
