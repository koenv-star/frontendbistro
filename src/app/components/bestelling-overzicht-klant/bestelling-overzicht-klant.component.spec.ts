import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestellingOverzichtKlantComponent } from './bestelling-overzicht-klant.component';

describe('BestellingOverzichtKlantComponent', () => {
  let component: BestellingOverzichtKlantComponent;
  let fixture: ComponentFixture<BestellingOverzichtKlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestellingOverzichtKlantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestellingOverzichtKlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
