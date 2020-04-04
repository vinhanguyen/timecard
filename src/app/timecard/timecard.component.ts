import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { Entry } from '../models/entry';
import { Observable } from 'rxjs';
import { selectCurrent, selectAll } from '../selectors/timecard.selectors';
import { punch, load, clear } from '../actions/timecard.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-timecard',
  templateUrl: './timecard.component.html',
  styleUrls: ['./timecard.component.scss']
})
export class TimecardComponent implements OnInit {

  current$: Observable<Entry>;
  all$: Observable<Entry[]>;
  confirm: boolean;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.current$ = this.store.select(selectCurrent);
    this.all$ = this.store.select(selectAll);

    this.store.dispatch(load());
  }

  punch() {
    this.store.dispatch(punch());
  }

  clear() {
    this.store.dispatch(clear());
    this.confirm = false;
  }

  subtotal(entry: Entry) {
    return entry.stop - entry.start;
  }

  total() {
    return this.all$.pipe(
      map(all => all.reduce((total, entry) => {
        return total + this.subtotal(entry);
      }, 0))
    );
  }

}
