import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErreurVehiculeComponent } from './erreur-vehicule.component';

describe('ErreurVehiculeComponent', () => {
  let component: ErreurVehiculeComponent;
  let fixture: ComponentFixture<ErreurVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErreurVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErreurVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
