import { TestBed } from '@angular/core/testing';

import { ZaakService } from './zaak.service';

describe('ZaakService', () => {
  let service: ZaakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZaakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
