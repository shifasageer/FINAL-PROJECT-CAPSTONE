import { TestBed } from '@angular/core/testing';

import { WellbeingService } from './wellbeing.service';

describe('WellbeingService', () => {
  let service: WellbeingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WellbeingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
