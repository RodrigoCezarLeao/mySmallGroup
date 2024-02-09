import { Component, ViewChild } from '@angular/core';
import { CLOSE_DIALOG, OPEN_DESC_DIALOG } from 'src/app/events';
import { HubService } from 'src/app/service/hub.service';
import { TranslateService } from 'src/app/service/translate.service';

@Component({
  selector: 'app-description-dialog',
  templateUrl: './description-dialog.component.html',
  styleUrls: ['./description-dialog.component.css']
})
export class DescriptionDialogComponent {
  @ViewChild("textarea") textarea: any;  
  description = "";
  updateDesc: any;
  disabledTextarea = false;
  
  closeDialog(){
    this.hub.notify(CLOSE_DIALOG);
  }
  
  constructor(private hub: HubService, public intl: TranslateService){
    this.hub.subscribe(OPEN_DESC_DIALOG, (args: any) => {
      this.description = args.desc;
      setTimeout(() => {        
        this.textarea.nativeElement.scrollTo(0, 0);
        this.textarea.nativeElement.blur();
      }, 250);

      if(!args.updateDesc)
        this.disabledTextarea = true;
      else
        this.updateDesc = args.updateDesc;
    });

  }
}
