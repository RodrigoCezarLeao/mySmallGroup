import { Component } from '@angular/core';
import { clearTokens, getInfo, saveTokensInSessionStorage } from 'src/app/helpers/base_request';
import { TranslateService } from 'src/app/service/translate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  inputType = "password";
  passcode = "";

  invalidPasswordMessage = "";
  isLoading = false;

  constructor(public intl: TranslateService){}

  toggleInput(event: Event){
    event.preventDefault();
    this.inputType = this.inputType === "password" ? "text" : "password";
  }

  async loginAttempt(){
    this.isLoading = true;

    let res = await getInfo(this.passcode);

    if (res?.error === "wrong password"){
      this.invalidPasswordMessage = this.intl.translate("invalid_password");
      clearTokens();      
    }
    else{
      this.invalidPasswordMessage = this.intl.translate("success_password");
      saveTokensInSessionStorage(res);
    }

    this.isLoading = false;
  }
}
