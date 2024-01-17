import { Component } from '@angular/core';
import { formatAbbDayMonthYear, formatDayMonthYear } from 'src/app/helpers/date_time';
import { event } from 'src/app/interface/event';
import { emptyGroup, group } from 'src/app/interface/group';
import { participant } from 'src/app/interface/participant';
import { GroupService } from 'src/app/service/group.service';
import { TranslateService } from 'src/app/service/translate.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  group: group = emptyGroup;
  filterStartDate: Date = new Date();
  filterFinalDate: Date = new Date();
  fullnameFlag = true;

  constructor(public intl: TranslateService, private groupService: GroupService){
    this.getGroup();
  }
  
  async getGroup(){
    if (await this.groupService.init()){
      this.group = this.groupService.group;      
      console.log("🚀 ~ ReportComponent ~ getGroup ~ this.group:", this.group)
    }
  }

  frequencyStatus(participant: participant){
    const participantEvents = this.group.events.filter(x => x.presence.includes(participant.id));
    return `${participantEvents.length}/${this.group.events.length}`;
  }

  eventDate(event: event){
    return formatAbbDayMonthYear(new Date(event.dateStr + " 00:00"));
  }

  participantWasPresentInEvent(participant: participant, event: event){
    if (event.presence.find(x => x === participant.id))
      return "presence";

    return "absent";
  }
}
