import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { punch, load, loadSuccess, loadFailure, remove } from '../actions/timecard.actions';
import { mergeMap, withLatestFrom, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { selectTimecard } from '../selectors/timecard.selectors';

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

  punch$ = createEffect(() => this.actions$.pipe(
    ofType(punch),
    mergeMap(action => of(action).pipe(
      withLatestFrom(this.store.select(selectTimecard))
    )),
    tap(([action, timecard]) => {
      localStorage.setItem('timecard', JSON.stringify(timecard));
    })
  ), {dispatch: false});

  remove$ = createEffect(() => this.actions$.pipe(
    ofType(remove),
    mergeMap(action => of(action).pipe(
      withLatestFrom(this.store.select(selectTimecard))
    )),
    tap(([action, timecard]) => {
      localStorage.setItem('timecard', JSON.stringify(timecard));
    })
  ), {dispatch: false});

  constructor(private actions$: Actions, private store: Store<State>) {}

}
