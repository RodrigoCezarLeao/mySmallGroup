import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { closeFullScreen, openFullScreen } from 'src/app/helpers/general';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  activePage = "/settings";
  isFullScreen = false;

  constructor(private router: Router){
    this.activePage = `/${location.href.split('/')[location.href.split('/').length - 1]}`;
  }

  redirectTo(route: string){
    openFullScreen();
    this.router.navigate([route]);
    this.activePage = route;
    this.isFullScreen = true;
  }

  toggleFullScreen(){
    if (this.isFullScreen)
      closeFullScreen();
    else
      openFullScreen();

    this.isFullScreen = !this.isFullScreen;
  }
}
