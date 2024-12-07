import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectExerciseCard2Component } from './select-exercise-card2.component';

describe('SelectExerciseCard2Component', () => {
  let component: SelectExerciseCard2Component;
  let fixture: ComponentFixture<SelectExerciseCard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectExerciseCard2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectExerciseCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
