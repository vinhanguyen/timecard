import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as fromTimecard from '../reducers/timecard.reducer';

export const selectTimecard = createFeatureSelector<fromRoot.State, fromTimecard.State>(fromTimecard.timecardFeatureKey);

export const selectEntries = createSelector(
  selectTimecard,
  (state: fromTimecard.State) => state.entries
);