import { TestBed } from '@angular/core/testing';

import { ZaakserviceService } from './zaakservice.service';

describe('ZaakserviceService', () => {
  let service: ZaakserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZaakserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
