import { TestBed } from '@angular/core/testing';
import { BestellenService } from './bestellen.service';

describe('BestellenService', () => {
  let service: BestellenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BestellenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
