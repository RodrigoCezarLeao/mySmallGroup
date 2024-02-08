import { Component, ViewChild } from '@angular/core';
import { OPEN_DESC_DIALOG } from 'src/app/events';
import { HubService } from 'src/app/service/hub.service';

@Component({
  selector: 'app-description-dialog',
  templateUrl: './description-dialog.component.html',
  styleUrls: ['./description-dialog.component.css']
})
export class DescriptionDialogComponent {
  @ViewChild("textarea") textarea: any;  
  description = "";
  updateDesc: any;

  constructor(private hub: HubService){
    this.hub.subscribe(OPEN_DESC_DIALOG, (args: any) => {
      this.description = args.desc;
      setTimeout(() => {        
        this.textarea.nativeElement.scrollTo(0, 0);
        this.textarea.nativeElement.blur();
      }, 250);

      this.updateDesc = args.updateDesc;
    });

  }
}
