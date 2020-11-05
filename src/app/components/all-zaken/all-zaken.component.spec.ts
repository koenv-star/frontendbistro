import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllZakenComponent } from './all-zaken.component';

describe('AllZakenComponent', () => {
  let component: AllZakenComponent;
  let fixture: ComponentFixture<AllZakenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllZakenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllZakenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
