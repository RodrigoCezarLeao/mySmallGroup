import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SettingsComponent } from './component/settings/settings.component';
import { ManageParticipantsComponent } from './component/manage-participants/manage-participants.component';

const routes: Routes = [
  {path: "", component: LoginComponent, title: "MySmallGroup - Log In"},
  {path: "settings", component: SettingsComponent},
  {path: "manage_participants", component: ManageParticipantsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
