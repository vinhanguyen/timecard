import { createAction, props } from '@ngrx/store';
import { State } from '../reducers/timecard.reducer';
import { Entry } from '../models/entry';

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
  '[Timecard] Punch'
);

export const clear = createAction(
  '[Timecard] Clear'
);

export const remove = createAction(
  '[Timecard] Remove',
  props<{ entry: Entry }>()
);