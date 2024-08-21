import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreEntrevistaComponent } from './pre-entrevista.component';

describe('PreEntrevistaComponent', () => {
  let component: PreEntrevistaComponent;
  let fixture: ComponentFixture<PreEntrevistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreEntrevistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreEntrevistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
