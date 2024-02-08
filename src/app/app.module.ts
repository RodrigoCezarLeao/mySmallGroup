import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SettingsComponent } from './component/settings/settings.component';
import { NavBarComponent } from './feature/nav-bar/nav-bar.component';
import { ManageParticipantsComponent } from './component/manage-participants/manage-participants.component';
import { FullscreenComponent } from './feature/fullscreen/fullscreen.component';
import { EventsViewComponent } from './component/calendar/events-view/events-view.component';
import { EventManagerComponent } from './component/calendar/event-manager/event-manager.component';
import { ShuffleDialogComponent } from './component/calendar/shuffle-dialog/shuffle-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReportComponent } from './component/report/report.component';
import { ImgDialogComponent } from './component/calendar/img-dialog/img-dialog.component';
import { DescriptionDialogComponent } from './component/calendar/description-dialog/description-dialog.component';
import { PresenceDialogComponent } from './component/calendar/presence-dialog/presence-dialog.component';

  

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SettingsComponent,
    NavBarComponent,
    ManageParticipantsComponent,
    FullscreenComponent,
    EventsViewComponent,
    EventManagerComponent,
    ShuffleDialogComponent,
    ReportComponent,
    ImgDialogComponent,
    DescriptionDialogComponent,
    PresenceDialogComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
