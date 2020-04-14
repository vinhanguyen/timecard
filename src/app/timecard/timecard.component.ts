import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { Entry } from '../models/entry';
import { timer } from 'rxjs';
import { selectEntries } from '../selectors/timecard.selectors';
import { punch, load, clear, remove } from '../actions/timecard.actions';
import { formatDate } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-timecard',
  templateUrl: './timecard.component.html',
  styleUrls: ['./timecard.component.scss']
})
export class TimecardComponent implements OnInit {

  entries: Entry[];
  confirm: boolean;
  working: boolean;
  title: string;
  now: number;
  dataSource: MatTableDataSource<Entry>;
  displayedColumns = ['start', 'stop', 'total', 'actions'];

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.select(selectEntries).subscribe(entries => {
      this.entries = entries;
      this.dataSource = new MatTableDataSource(entries);
      this.working = entries.some(entry => !entry.stop);
    });
    this.store.dispatch(load());
    
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
