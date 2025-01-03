import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreEntrevistaReingresoComponent } from './pre-entrevista-reingreso.component';

describe('PreEntrevistaReingresoComponent', () => {
  let component: PreEntrevistaReingresoComponent;
  let fixture: ComponentFixture<PreEntrevistaReingresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreEntrevistaReingresoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreEntrevistaReingresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
