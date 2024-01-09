import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { checkIfLoggedIn, clearTokens, getInfo, saveTokensInSessionStorage } from 'src/app/helpers/base_request';
import { openFullScreen } from 'src/app/helpers/general';
import { GroupService } from 'src/app/service/group.service';
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

  constructor(
    public intl: TranslateService,
    private groupService: GroupService,
    private router: Router
  ){
    if(checkIfLoggedIn())
      this.router.navigate(["/settings"]);
  }

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
      if (await this.groupService.init(res)){
        saveTokensInSessionStorage(res);
        this.router.navigate(['/settings']);
      }else {
        clearTokens();
      }
    }

    this.isLoading = false;
  }
}
