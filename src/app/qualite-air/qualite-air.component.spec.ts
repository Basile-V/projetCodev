import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualiteAirComponent } from './qualite-air.component';

describe('QualiteAirComponent', () => {
  let component: QualiteAirComponent;
  let fixture: ComponentFixture<QualiteAirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualiteAirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualiteAirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
