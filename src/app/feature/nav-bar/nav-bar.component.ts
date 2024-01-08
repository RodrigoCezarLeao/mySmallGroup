import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  activePage = "/settings";

  constructor(private router: Router){}

  redirectTo(route: string){
    this.router.navigate([route]);
    this.activePage = route;
  }
}
