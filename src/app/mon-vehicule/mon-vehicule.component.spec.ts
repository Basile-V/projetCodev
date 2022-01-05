import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonVehiculeComponent } from './mon-vehicule.component';

describe('MonVehiculeComponent', () => {
  let component: MonVehiculeComponent;
  let fixture: ComponentFixture<MonVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
