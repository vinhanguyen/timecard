import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { Entry } from '../models/entry';
import { timer, Observable } from 'rxjs';
import { selectEntries, selectCurrentJob, selectJob, selectFirstEntry } from '../selectors/timecard.selectors';
import { punch, load, remove } from '../actions/timecard.actions';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from './confirm/confirm.component';
import { Job } from '../models/job';
import { mergeMap, map } from 'rxjs/operators';

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
  displayedColumns = ['select', 'start', 'stop', 'time', 'total'];
  selection = new SelectionModel<Entry>(true, []);
  currentJob$: Observable<Job>;
  msInHour = 1000*60*60;
  showHms = true;
  showDate = true;
  date$: Observable<number>;

  constructor(private store: Store<State>, private dialog: MatDialog) { }

  ngOnInit() {
    this.store.select(selectEntries).subscribe(entries => {
      this.entries = entries;
      this.dataSource = new MatTableDataSource(entries);
      this.working = entries.some(entry => !entry.stop);
    });
    this.currentJob$ = this.store.select(selectCurrentJob).pipe(
      mergeMap(currentJob => this.store.select(selectJob, {name: currentJob}))
    );
    this.date$ = this.store.select(selectFirstEntry).pipe(
      map(entry => entry ? entry.start : Date.now())
    );
    this.store.dispatch(load());
    
    timer(0, 1000).subscribe(() => {
      this.now = Date.now();
    });
  }

  punch() {
    this.selection.clear();
    this.store.dispatch(punch({time: this.now}));
  }

  removeSelected() {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Confirm Remove',
        content: 'Remove selected entries?',
        button: 'Remove'
      }
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.selection.selected.forEach(entry => {
          this.selection.deselect(entry);
          this.store.dispatch(remove({entry}));
        });
      }
    });
  }

  subtotalTime(entry: Entry) {
    return (entry.stop ? entry.stop : this.now) - entry.start;
  }

  totalTime(entries: Entry[]) {
    return entries.reduce((total, entry) => {
      return total + this.subtotalTime(entry);
    }, 0);
  }

  subtotal(entry: Entry, job: Job) {
    return this.subtotalTime(entry) / this.msInHour * job.rate;
  }

  total(entries: Entry[], job: Job) {
    return this.totalTime(entries) / this.msInHour * job.rate;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numEntries = this.dataSource.data.length;
    return numSelected == numEntries;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(entry => this.selection.select(entry));
  }

  toggleHms() {
    this.showHms = !this.showHms;
  }

  toggleTitle() {
    this.showDate = !this.showDate;
  }

}
