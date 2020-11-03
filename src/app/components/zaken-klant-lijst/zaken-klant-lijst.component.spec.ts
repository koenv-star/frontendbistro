import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZakenKlantLijstComponent } from './zaken-klant-lijst.component';

describe('ZakenKlantLijstComponent', () => {
  let component: ZakenKlantLijstComponent;
  let fixture: ComponentFixture<ZakenKlantLijstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZakenKlantLijstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZakenKlantLijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
