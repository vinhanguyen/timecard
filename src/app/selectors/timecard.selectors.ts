import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as fromTimecard from '../reducers/timecard.reducer';

export const selectTimecard = createFeatureSelector<fromRoot.State, fromTimecard.State>(fromTimecard.timecardFeatureKey);

export const selectEntries = createSelector(
  selectTimecard,
  (state: fromTimecard.State) => state.entries.filter(e => e.job === state.currentJob)
);

export const selectJobs = createSelector(
  selectTimecard,
  (state: fromTimecard.State) => state.jobs
);

export const selectCurrentJob = createSelector(
  selectTimecard,
  (state: fromTimecard.State) => state.currentJob
);

export const selectJob = createSelector(
  selectTimecard,
  (state: fromTimecard.State, {name}) => state.jobs ? state.jobs.find(j => j.name === name) : null
);