import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { clear } from 'src/app/actions/timecard.actions';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  constructor(private store: Store<State>, private dialog: MatDialog) { }

  ngOnInit() {
  }

  clear() {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Confirm Clear',
        content: 'Clear all data?',
        button: 'Clear'
      }
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.store.dispatch(clear());
      }
    });
  }

}
