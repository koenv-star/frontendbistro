import { TestBed } from '@angular/core/testing';

import { ReservatieService } from './reservatie.service';

describe('ReservatieService', () => {
  let service: ReservatieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservatieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
