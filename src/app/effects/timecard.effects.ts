import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { punch, load, loadSuccess, loadFailure, remove, addJob, deleteJob, changeJob, clear, addJobSuccess, addJobFailure } from '../actions/timecard.actions';
import { mergeMap, withLatestFrom, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { selectTimecard, selectJobs } from '../selectors/timecard.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TimecardEffects {

  load$ = createEffect(() => this.actions$.pipe(
    ofType(load),
    map(action => {
      try {
        return loadSuccess({timecard: JSON.parse(localStorage.getItem('timecard'))});
      } catch(error) {
        return loadFailure({error});
      }
    })
  ));

  addJob$ = createEffect(() => this.actions$.pipe(
    ofType(addJob),
    mergeMap(action => of(action).pipe(
      withLatestFrom(this.store.select(selectJobs))
    )),
    map(([{job}, jobs]) => {
      if (jobs.some(j => j.name === job.name)) {
        return addJobFailure({error: `Name '${job.name}' already exists`});
      }
      return addJobSuccess({job});
    })
  ));

  addJobFailure$ = createEffect(() => this.actions$.pipe(
    ofType(addJobFailure),
    tap(({error}) => {
      this.snackBar.open(error, null, {duration: 3000});
    })
  ), {dispatch: false});

  change$ = createEffect(() => this.actions$.pipe(
    ofType(punch, remove, addJob, deleteJob, changeJob),
    mergeMap(action => of(action).pipe(
      withLatestFrom(this.store.select(selectTimecard))
    )),
    tap(([action, timecard]) => {
      localStorage.setItem('timecard', JSON.stringify(timecard));
    })
  ), {dispatch: false});

  clear$ = createEffect(() => this.actions$.pipe(
    ofType(clear),
    tap(() => {
      localStorage.clear();
      this.snackBar.open('Timecard data cleared', null, {duration: 3000});
    })
  ), {dispatch: false});

  deleteJob$ = createEffect(() => this.actions$.pipe(
    ofType(deleteJob),
    tap(({job: {name}}) => {
      this.snackBar.open(`Job '${name}' deleted`, null, {duration: 3000});
    })
  ), {dispatch: false});

  constructor(private actions$: Actions, private store: Store<State>, private snackBar: MatSnackBar) {}

}
