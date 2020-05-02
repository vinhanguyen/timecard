import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { clear } from 'src/app/actions/timecard.actions';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  clear() {
    this.store.dispatch(clear());
  }

}
