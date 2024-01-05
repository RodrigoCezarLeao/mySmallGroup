import { Component } from '@angular/core';
import { TranslateService } from './service/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mySmallGroup';

  constructor(private intl: TranslateService){}

  changeLanguage(lang: string){
    this.intl.changeLanguage(lang);
  }
}
