import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KredietComponent } from './krediet.component';

describe('KredietComponent', () => {
  let component: KredietComponent;
  let fixture: ComponentFixture<KredietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KredietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KredietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
