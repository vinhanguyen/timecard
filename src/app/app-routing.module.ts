import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimecardComponent } from './timecard/timecard.component';
import { JobsComponent } from './timecard/jobs/jobs.component';
import { PreferencesComponent } from './timecard/preferences/preferences.component';


const routes: Routes = [
  {path: '', component: TimecardComponent},
  {path: 'jobs', component: JobsComponent},
  {path: 'preferences', component: PreferencesComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
