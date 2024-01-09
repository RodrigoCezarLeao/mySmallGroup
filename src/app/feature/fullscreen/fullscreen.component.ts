import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { clearTokens } from 'src/app/helpers/base_request';
import { closeFullScreen, openFullScreen } from 'src/app/helpers/general';

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.css']
})
export class FullscreenComponent {
  isFullScreen = false;

  constructor(private router: Router){}

  toggleFullScreen(){
    if (this.isFullScreen)
      closeFullScreen();
    else
      openFullScreen();

    this.isFullScreen = !this.isFullScreen;
  }

}
