import { TestBed } from '@angular/core/testing';

import { InkomService } from './inkom.service';

describe('InkomService', () => {
  let service: InkomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InkomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
