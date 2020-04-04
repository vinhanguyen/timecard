import { Action, createReducer, on } from '@ngrx/store';
import { Entry } from '../models/entry';
import { punch, loadSuccess, clear } from '../actions/timecard.actions';
import * as _ from 'lodash';

export const timecardFeatureKey = 'timecard';

export interface State {
  current: Entry;
  all: Entry[];
}

export const initialState: State = {
  current: null,
  all: []
};

const timecardReducer = createReducer(
  initialState,
  on(punch, state => {
    let next = _.cloneDeep(state);

    if (next.current) {
      next.current.stop = Date.now();
      next.all.push(next.current);
      next.current = null;
    } else {
      next.current = {start: Date.now()} as Entry;
    }

    return next;
  }),
  on(loadSuccess, (state, {timecard}) => {
    let next = _.cloneDeep(initialState);

    if (timecard) {
      next.current = timecard.current;
      next.all = timecard.all;
    }

    return next;
  }),
  on(clear, (state) => {
    let next = _.cloneDeep(initialState);
    return next;
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return timecardReducer(state, action);
}
