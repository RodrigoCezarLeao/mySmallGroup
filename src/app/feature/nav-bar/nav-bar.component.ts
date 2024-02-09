import { Component, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DescriptionDialogComponent } from 'src/app/component/calendar/description-dialog/description-dialog.component';
import { ImgDialogComponent } from 'src/app/component/calendar/img-dialog/img-dialog.component';
import { PresenceDialogComponent } from 'src/app/component/calendar/presence-dialog/presence-dialog.component';
import { ShuffleDialogComponent } from 'src/app/component/calendar/shuffle-dialog/shuffle-dialog.component';
import { CLOSE_DIALOG, OPEN_DESC_DIALOG, OPEN_DIALOG, OPEN_IMG_DIALOG, OPEN_PRESENCE_DIALOG, OPEN_SHUFFLE_DIALOG } from 'src/app/events';
import { HubService } from 'src/app/service/hub.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  activePage = "/settings";

  constructor(private router: Router, public dialog: MatDialog, private hub: HubService){
    this.activePage = `/${location.href.split('/')[location.href.split('/').length - 1]}`;
    
    this.hub.subscribe(OPEN_DIALOG, (args: {component: any, data: any}) => {

      let event = "";

      switch(args.component){
        case DescriptionDialogComponent:
          event = OPEN_DESC_DIALOG;
          break;
        case ImgDialogComponent:
          event = OPEN_IMG_DIALOG;
          break;
        case PresenceDialogComponent:
          event = OPEN_PRESENCE_DIALOG;
          break;
        case ShuffleDialogComponent:
          event = OPEN_SHUFFLE_DIALOG;
          break;
        default:
          break;
      }
      this.dialog.open(args.component, {width: '350px'});
      this.hub.notifyArgs(event, args.data);
    });

    this.hub.subscribe(CLOSE_DIALOG, () => this.dialog.closeAll());
  }

  redirectTo(route: string){
    this.router.navigate([route]);
    this.activePage = route;
  }  
}
