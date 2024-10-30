import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaMenorEdadComponent } from './ficha-menor-edad.component';

describe('FichaMenorEdadComponent', () => {
  let component: FichaMenorEdadComponent;
  let fixture: ComponentFixture<FichaMenorEdadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaMenorEdadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaMenorEdadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
