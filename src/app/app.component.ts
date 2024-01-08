import { Component } from '@angular/core';
import { TranslateService } from './service/translate.service';
import { checkIfLoggedIn } from './helpers/base_request';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mySmallGroup';

  constructor(private intl: TranslateService){}

  

  checkIfLoggedIn(){
    return checkIfLoggedIn();
  }
}
