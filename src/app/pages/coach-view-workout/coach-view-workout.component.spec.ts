import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachViewWorkoutComponent } from './coach-view-workout.component';

describe('CoachViewWorkoutComponent', () => {
  let component: CoachViewWorkoutComponent;
  let fixture: ComponentFixture<CoachViewWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachViewWorkoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachViewWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
