import * as fromTimecard from './timecard.actions';

describe('loadTimecards', () => {
  it('should return an action', () => {
    expect(fromTimecard.loadTimecards().type).toBe('[Timecard] Load Timecards');
  });
});
