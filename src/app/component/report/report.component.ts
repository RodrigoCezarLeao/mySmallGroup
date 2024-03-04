import { Component } from '@angular/core';
import { formatAbbDayMonthYear, formatDayMonthYear, isStrDateWindowValid } from 'src/app/helpers/date_time';
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
  eventsToShow: event[] = [];  
  filterStartDate: string = "";
  filterFinalDate: string = "";
  fullnameFlag = true;

  constructor(public intl: TranslateService, private groupService: GroupService){
    this.getGroup();
  }
  
  async getGroup(){
    if (await this.groupService.init()){
      this.group = this.groupService.group;
      this.eventsToShow = structuredClone(this.group.events).filter((x: event) => x.frequencyFlag);
    }
  }

  frequencyStatus(participant: participant){
    const participantEvents = this.eventsToShow.filter(x => x.presence.includes(participant.id));
    return `${participantEvents.length}/${this.eventsToShow.length}`;
  }

  eventDate(event: event){
    return formatAbbDayMonthYear(new Date(event.dateStr + " 00:00"));
  }

  participantWasPresentInEvent(participant: participant, event: event){
    if (event.presence.find(x => x === participant.id))
      return "presence";

    return "absent";
  }

  applyFiltersSearch(){
    if (isStrDateWindowValid(this.filterStartDate, this.filterFinalDate)){
      this.eventsToShow = this.group.events.filter(x => x.dateStr >= this.filterStartDate && x.dateStr <= this.filterFinalDate)
    }
  }

  participantPresentAtLeastOnce(participant: participant){
    return this.eventsToShow.filter(x => x.presence.includes(participant.id)).length > 0;
  }
}
