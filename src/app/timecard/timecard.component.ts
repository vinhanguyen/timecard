import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { Entry } from '../models/entry';
import { Observable } from 'rxjs';
import { selectEntries } from '../selectors/timecard.selectors';
import { punch, load, clear, remove } from '../actions/timecard.actions';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-timecard',
  templateUrl: './timecard.component.html',
  styleUrls: ['./timecard.component.scss']
})
export class TimecardComponent implements OnInit {

  entries$: Observable<Entry[]>;
  confirm: boolean;
  working$: Observable<boolean>;
  title: string;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.entries$ = this.store.select(selectEntries);
    this.store.dispatch(load());
    this.working$ = this.store.select(selectEntries).pipe(
      map(entries => entries.some(entry => !entry.stop))
    );
    this.title = `Timecard for ${formatDate(Date.now(), 'M/d/yyyy', 'en-US')}`;
  }

  punch() {
    this.store.dispatch(punch());
  }

  remove(entry: Entry) {
    this.store.dispatch(remove({entry}))
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
