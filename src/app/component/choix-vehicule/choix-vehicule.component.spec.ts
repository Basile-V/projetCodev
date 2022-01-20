import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixVehiculeComponent } from './choix-vehicule.component';

describe('ChoixVehiculeComponent', () => {
  let component: ChoixVehiculeComponent;
  let fixture: ComponentFixture<ChoixVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoixVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoixVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
