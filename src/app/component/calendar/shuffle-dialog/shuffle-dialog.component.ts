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
  fontSize = "16 px";
  connector = "";

  constructor(private hub: HubService){
    this.hub.subscribe(OPEN_SHUFFLE_DIALOG, (args: any) => {
      this.fontSize = `font-size: ${args["template"]["shuffle_dialog_font_size"]}px`;
      this.connector = args["template"]["shuffle_connector_word"];
      this.description = args["desc"].split("\n").map((x: string) => x.split(this.connector));      
    });
  }

  closeDialog(){
    this.hub.notify(CLOSE_SHUFFLE_DIALOG);
  }
}
