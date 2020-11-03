import { TestBed } from '@angular/core/testing';

import { BestellingServiceService } from './bestelling-service.service';

describe('BestellingServiceService', () => {
  let service: BestellingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BestellingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
