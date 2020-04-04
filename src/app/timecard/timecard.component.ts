import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { Entry } from '../models/entry';
import { Observable } from 'rxjs';
import { selectEntries } from '../selectors/timecard.selectors';
import { punch, load, clear } from '../actions/timecard.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-timecard',
  templateUrl: './timecard.component.html',
  styleUrls: ['./timecard.component.scss']
})
export class TimecardComponent implements OnInit {

  entries$: Observable<Entry[]>;
  confirm: boolean;
  working$: Observable<boolean>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.entries$ = this.store.select(selectEntries);
    this.store.dispatch(load());
    this.working$ = this.store.select(selectEntries).pipe(
      map(entries => entries.some(entry => !entry.stop))
    );
  }

  punch() {
    this.store.dispatch(punch());
  }

  clear() {
    this.store.dispatch(clear());
    this.confirm = false;
  }

  subtotal(entry: Entry) {
    if (entry.stop) {
      return entry.stop - entry.start;
    } else {
      return 0;
    }
  }

  total(entries: Entry[]) {
    return entries.reduce((total, entry) => {
      return total + this.subtotal(entry);
    }, 0);
  }

}
