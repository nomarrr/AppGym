import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseCard2Component } from './exercise-card2.component';

describe('ExerciseCard2Component', () => {
  let component: ExerciseCard2Component;
  let fixture: ComponentFixture<ExerciseCard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseCard2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
