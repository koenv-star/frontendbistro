import { TestBed } from '@angular/core/testing';

import { CostumerlistService } from './costumerlist.service';

describe('CostumerlistService', () => {
  let service: CostumerlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostumerlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
