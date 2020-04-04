import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TimecardEffects } from './timecard.effects';

describe('TimecardEffects', () => {
  let actions$: Observable<any>;
  let effects: TimecardEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimecardEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<TimecardEffects>(TimecardEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
