import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarendarComponent } from './carendar.component';

describe('CarendarComponent', () => {
  let component: CarendarComponent;
  let fixture: ComponentFixture<CarendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarendarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
