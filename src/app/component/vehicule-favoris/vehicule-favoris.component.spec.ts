import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeFavorisComponent } from './vehicule-favoris.component';

describe('VehiculeFavorisComponent', () => {
  let component: VehiculeFavorisComponent;
  let fixture: ComponentFixture<VehiculeFavorisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculeFavorisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculeFavorisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
