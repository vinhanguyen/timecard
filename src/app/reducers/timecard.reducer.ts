import { Action, createReducer, on } from '@ngrx/store';
import { Entry } from '../models/entry';
import { punch, loadSuccess, clear, remove } from '../actions/timecard.actions';
import * as _ from 'lodash';

export const timecardFeatureKey = 'timecard';

export interface State {
  entries: Entry[];
}

export const initialState: State = {
  entries: []
};

const timecardReducer = createReducer(
  initialState,
  on(loadSuccess, (state, {timecard}) => {
    let next = _.cloneDeep(initialState);
    if (timecard) {
      next.entries = timecard.entries;
    }
    return next;
  }),
  on(punch, (state, {time}) => {
    let next = _.cloneDeep(state);
    let current = next.entries.find(entry => !entry.stop);
    if (current) {
      current.stop = time;
    } else {
      next.entries.push({start: time});
    }
    return next;
  }),
  on(clear, (state) => {
    let next = _.cloneDeep(initialState);
    return next;
  }),
  on(remove, (state, {entry}) => {
    let next = _.cloneDeep(state);
    next.entries = next.entries.filter(e => e.start !== entry.start);
    return next;
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return timecardReducer(state, action);
}
