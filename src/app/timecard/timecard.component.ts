import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { Entry } from '../models/entry';
import { timer } from 'rxjs';
import { selectEntries } from '../selectors/timecard.selectors';
import { punch, load, remove } from '../actions/timecard.actions';
import { formatDate } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-timecard',
  templateUrl: './timecard.component.html',
  styleUrls: ['./timecard.component.scss']
})
export class TimecardComponent implements OnInit {

  entries: Entry[];
  working: boolean;
  now: number;
  dataSource: MatTableDataSource<Entry>;
  displayedColumns = ['select', 'start', 'stop', 'total'];
  selection = new SelectionModel<Entry>(true, []);

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.select(selectEntries).subscribe(entries => {
      this.entries = entries;
      this.dataSource = new MatTableDataSource(entries);
      this.working = entries.some(entry => !entry.stop);
    });
    this.store.dispatch(load());
    
    timer(0, 1000).subscribe(() => {
      this.now = Date.now();
    });
  }

  punch() {
    this.store.dispatch(punch({time: this.now}));
  }

  removeSelected() {
    this.selection.selected.forEach(entry => {
      this.selection.deselect(entry);
      this.store.dispatch(remove({entry}));
    });
  }

  subtotal(entry: Entry) {
    return (entry.stop ? entry.stop : this.now) - entry.start;
  }

  total(entries: Entry[]) {
    return entries.reduce((total, entry) => {
      return total + this.subtotal(entry);
    }, 0);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numEntries = this.dataSource.data.length;
    return numSelected == numEntries;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(entry => this.selection.select(entry));
  }

}
