import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExerciseCardComponent } from './edit-exercise-card.component';

describe('EditExerciseCardComponent', () => {
  let component: EditExerciseCardComponent;
  let fixture: ComponentFixture<EditExerciseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditExerciseCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditExerciseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
