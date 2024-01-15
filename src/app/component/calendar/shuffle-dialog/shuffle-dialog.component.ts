import { Component } from '@angular/core';
import { CLOSE_SHUFFLE_DIALOG, OPEN_SHUFFLE_DIALOG } from 'src/app/events';
import { HubService } from 'src/app/service/hub.service';

@Component({
  selector: 'app-shuffle-dialog',
  templateUrl: './shuffle-dialog.component.html',
  styleUrls: ['./shuffle-dialog.component.css']
})
export class ShuffleDialogComponent {
  description = "";

  constructor(private hub: HubService){
    this.hub.subscribe(OPEN_SHUFFLE_DIALOG, (args: string) => this.description = args);
  }

  closeDialog(){
    this.hub.notify(CLOSE_SHUFFLE_DIALOG);
  }
}
