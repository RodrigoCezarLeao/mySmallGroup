import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SettingsComponent } from './component/settings/settings.component';
import { ParticipantManagerTableComponent } from './feature/participant-manager-table/participant-manager-table.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { ManageParticipantsComponent } from './component/manage-participants/manage-participants.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SettingsComponent,
    ParticipantManagerTableComponent,
    NavBarComponent,
    ManageParticipantsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
