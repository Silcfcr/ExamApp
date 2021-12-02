import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBicyclesComponent } from './add-bicycles.component';

describe('AddBicyclesComponent', () => {
  let component: AddBicyclesComponent;
  let fixture: ComponentFixture<AddBicyclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBicyclesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBicyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
