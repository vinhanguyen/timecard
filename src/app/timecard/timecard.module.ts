import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimecardComponent } from './timecard.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [TimecardComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class TimecardModule { }
