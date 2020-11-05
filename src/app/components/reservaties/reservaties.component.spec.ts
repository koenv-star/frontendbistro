import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservatiesComponent } from './reservaties.component';

describe('ReservatiesComponent', () => {
  let component: ReservatiesComponent;
  let fixture: ComponentFixture<ReservatiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservatiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservatiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
