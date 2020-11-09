import { TestBed } from '@angular/core/testing';

import { BestellingVerzamelingService } from './bestelling-verzameling-service.service';

describe('BestellingVerzamelingServiceService', () => {
  let service: BestellingVerzamelingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BestellingVerzamelingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
