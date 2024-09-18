import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { WellbeingPageComponent } from './wellbeing-page/wellbeing-page.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { AddContactsComponent } from './add-contacts/add-contacts.component';
import { ViewContactsComponent } from './view-contacts/view-contacts.component';
import { EditsosComponent } from './editsos/editsos.component';
import { TipsComponent } from './tips/tips.component';
import { HelplineComponent } from './helpline/helpline.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DayPlannerComponent } from './day-planner/day-planner.component';
import { WorkLifeBalanceComponent } from './work-life-balance/work-life-balance.component';
import { SleepComponent } from './sleep/sleep.component';
import { ZenModeComponent } from './zen-mode/zen-mode.component';
import { ScreenTimeComponent } from './screen-time/screen-time.component';
import { DietComponent } from './diet/diet.component';
import { DeleteContactsComponent } from './delete-contacts/delete-contacts.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportAccidentComponent } from './report-accident/report-accident.component';
import { ChartsComponent } from './charts/charts.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ChatComponent } from './chat/chat.component';
import { LinksComponent } from './links/links.component';
import { LiveLocationComponent } from './live-location/live-location.component';

export const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'landing',
    component: LandingPageComponent,
    canActivate: [authGuard],
  },
  { path: 'menu', component: MenuPageComponent, canActivate: [authGuard] },
  {
    path: 'instructions',
    component: InstructionsComponent,
    canActivate: [authGuard],
  },
  { path: 'well', component: WellbeingPageComponent, canActivate: [authGuard] },
  {
    path: 'addcontacts',
    component: AddContactsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [authGuard],
  },
  {
    path: 'viewcontacts',
    component: ViewContactsComponent,
    canActivate: [authGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  {
    path: 'report',
    component: ReportAccidentComponent,
    canActivate: [authGuard],
  },
  {
    path: 'deletecontacts',
    component: DeleteContactsComponent,
    canActivate: [authGuard],
  },
  { path: 'editsos', component: EditsosComponent, canActivate: [authGuard] },
  { path: 'tips', component: TipsComponent, canActivate: [authGuard] },
  { path: 'helpline', component: HelplineComponent, canActivate: [authGuard] },
  {
    path: 'dayplanner',
    component: DayPlannerComponent,
    canActivate: [authGuard],
  },
  {
    path: 'worklife',
    component: WorkLifeBalanceComponent,
    canActivate: [authGuard],
  },
  { path: 'sleep', component: SleepComponent, canActivate: [authGuard] },
  { path: 'zen', component: ZenModeComponent, canActivate: [authGuard] },
  { path: 'diet', component: DietComponent, canActivate: [authGuard] },
  {
    path: 'screentime',
    component: ScreenTimeComponent,
    canActivate: [authGuard],
  },

  {
    path: 'chart',
    component: ChartsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'links', component: LinksComponent,
    canActivate: [authGuard],
  },
  {
    path: 'live', component: LiveLocationComponent,
    canActivate: [authGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
