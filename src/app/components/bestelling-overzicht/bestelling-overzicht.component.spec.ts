import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestellingOverzichtComponent } from './bestelling-overzicht.component';

describe('BestellingOverzichtComponent', () => {
  let component: BestellingOverzichtComponent;
  let fixture: ComponentFixture<BestellingOverzichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestellingOverzichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestellingOverzichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
