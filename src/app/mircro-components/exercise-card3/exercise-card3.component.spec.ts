import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseCard3Component } from './exercise-card3.component';

describe('ExerciseCard3Component', () => {
  let component: ExerciseCard3Component;
  let fixture: ComponentFixture<ExerciseCard3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseCard3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseCard3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
