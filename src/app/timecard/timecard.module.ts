import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimecardComponent } from './timecard.component';
import { FormsModule } from '@angular/forms';
import { HmsPipe } from './hms.pipe';


@NgModule({
  declarations: [TimecardComponent, HmsPipe],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class TimecardModule { }
