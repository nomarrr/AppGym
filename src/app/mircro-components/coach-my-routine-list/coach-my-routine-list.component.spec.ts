import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachMyRoutineListComponent } from './coach-my-routine-list.component';

describe('CoachMyRoutineListComponent', () => {
  let component: CoachMyRoutineListComponent;
  let fixture: ComponentFixture<CoachMyRoutineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachMyRoutineListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachMyRoutineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
