import { TestBed } from '@angular/core/testing';

import { AdvertentiesService } from './advertenties.service';

describe('AdvertentiesService', () => {
  let service: AdvertentiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertentiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
