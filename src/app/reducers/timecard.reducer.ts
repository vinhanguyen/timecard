import { Action, createReducer, on } from '@ngrx/store';
import { Entry } from '../models/entry';
import { punch, loadSuccess, remove, addJob, deleteJob, changeJob, clear } from '../actions/timecard.actions';
import * as _ from 'lodash';
import { Job } from '../models/job';

export const timecardFeatureKey = 'timecard';

export interface State {
  entries: Entry[];
  jobs: Job[];
  currentJob: string;
}

export const initialState: State = {
  entries: [],
  jobs: [],
  currentJob: null
};

const timecardReducer = createReducer(
  initialState,
  on(loadSuccess, (state, {timecard}) => {
    let next = _.cloneDeep(state);
    if (timecard) {
      next.entries = timecard.entries ? timecard.entries : next.entries;
      next.jobs = timecard.jobs ? timecard.jobs : next.jobs;
      next.currentJob = timecard.currentJob ? timecard.currentJob : next.currentJob;
    }
    return next;
  }),
  on(punch, (state, {time}) => {
    let next = _.cloneDeep(state);
    let current = next.entries.find(entry => !entry.stop);
    if (current) {
      current.stop = time;
    } else {
      next.entries.push({start: time, job: next.currentJob});
    }
    return next;
  }),
  on(remove, (state, {entry}) => {
    let next = _.cloneDeep(state);
    next.entries = next.entries.filter(e => e.start !== entry.start);
    return next;
  }),
  on(addJob, (state, {job}) => {
    let next = _.cloneDeep(state);
    next.jobs.push(job);
    return next;
  }),
  on(deleteJob, (state, {job}) => {
    let next = _.cloneDeep(state);
    next.entries = next.entries.filter(e => e.job !== job.name);
    next.jobs = next.jobs.filter(j => j.name !== job.name);
    if (next.currentJob === job.name) {
      next.currentJob = null;
    }
    return next;
  }),
  on(changeJob, (state, {name}) => {
    let next = _.cloneDeep(state);
    next.currentJob = name;
    return next;
  }),
  on(clear, state => {
    let next = _.cloneDeep(initialState);
    return next;
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return timecardReducer(state, action);
}
