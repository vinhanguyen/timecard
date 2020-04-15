import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimecardComponent } from './timecard.component';
import { FormsModule } from '@angular/forms';
import { HmsPipe } from './hms.pipe';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [TimecardComponent, HmsPipe],
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ]
})
export class TimecardModule { }
