import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimecardComponent } from './timecard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HmsPipe } from './hms.pipe';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { JobsComponent } from './jobs/jobs.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { PreferencesComponent } from './preferences/preferences.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [TimecardComponent, HmsPipe, ConfirmComponent, JobsComponent, PreferencesComponent],
  entryComponents: [ConfirmComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatTabsModule,
    MatTooltipModule,
    RouterModule,
    MatCardModule
  ]
})
export class TimecardModule { }
