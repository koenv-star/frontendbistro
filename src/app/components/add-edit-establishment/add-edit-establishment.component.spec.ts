import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEstablishmentComponent } from './add-edit-establishment.component';

describe('AddEditEstablishmentComponent', () => {
  let component: AddEditEstablishmentComponent;
  let fixture: ComponentFixture<AddEditEstablishmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditEstablishmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditEstablishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
