import { createAction, props } from '@ngrx/store';
import { State } from '../reducers/timecard.reducer';
import { Entry } from '../models/entry';
import { Job } from '../models/job';

export const load = createAction(
  '[Timecard] Load'
);

export const loadSuccess = createAction(
  '[Timecard] Load Success',
  props<{ timecard: State }>()
);

export const loadFailure = createAction(
  '[Timecard] Load Failure',
  props<{ error: any }>()
);

export const punch = createAction(
  '[Timecard] Punch',
  props<{ time: number }>()
);

export const remove = createAction(
  '[Timecard] Remove',
  props<{ entry: Entry }>()
);

export const addJob = createAction(
  '[Timecard] Add Job',
  props<{ job: Job }>()
);

export const addJobSuccess = createAction(
  '[Timecard] Add Job Success',
  props<{ job: Job }>()
);

export const addJobFailure = createAction(
  '[Timecard] Add Job Failure',
  props<{ error: any }>()
);

export const deleteJob = createAction(
  '[Timecard] Delete Job',
  props<{ job: Job }>()
);

export const changeJob = createAction(
  '[Timecard] Change Job',
  props<{ name: string }>()
);

export const clear = createAction(
  '[Timecard] Clear'
);