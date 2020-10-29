import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaakComponent } from './zaak.component';

describe('ZaakComponent', () => {
  let component: ZaakComponent;
  let fixture: ComponentFixture<ZaakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZaakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
