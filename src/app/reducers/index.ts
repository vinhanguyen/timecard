import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromTimecard from './timecard.reducer';

export interface State {

  [fromTimecard.timecardFeatureKey]: fromTimecard.State;
}

export const reducers: ActionReducerMap<State> = {

  [fromTimecard.timecardFeatureKey]: fromTimecard.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
