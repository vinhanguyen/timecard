import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { Entry } from '../models/entry';
import { Observable, timer } from 'rxjs';
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
  now: number;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.entries$ = this.store.select(selectEntries);
    this.store.dispatch(load());

    this.working$ = this.store.select(selectEntries).pipe(
      map(entries => entries.some(entry => !entry.stop))
    );
    
    this.title = `Timecard for ${formatDate(Date.now(), 'M/d/yyyy', 'en-US')}`;
    
    timer(0, 1000).subscribe(() => {
      this.now = Date.now();
    });
  }

  punch() {
    this.store.dispatch(punch({time: this.now}));
  }

  remove(entry: Entry) {
    this.store.dispatch(remove({entry}))
  }

  clear() {
    this.store.dispatch(clear());
    this.confirm = false;
  }

  subtotal(entry: Entry) {
    return (entry.stop ? entry.stop : this.now) - entry.start;
  }

  total(entries: Entry[]) {
    return entries.reduce((total, entry) => {
      return total + this.subtotal(entry);
    }, 0);
  }

}
