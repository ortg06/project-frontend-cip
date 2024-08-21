import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaAdultoComponent } from './ficha-adulto.component';

describe('FichaAdultoComponent', () => {
  let component: FichaAdultoComponent;
  let fixture: ComponentFixture<FichaAdultoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaAdultoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaAdultoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
