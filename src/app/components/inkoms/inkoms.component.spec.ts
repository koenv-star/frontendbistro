import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InkomsComponent } from './inkoms.component';

describe('InkomsComponent', () => {
  let component: InkomsComponent;
  let fixture: ComponentFixture<InkomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InkomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InkomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
