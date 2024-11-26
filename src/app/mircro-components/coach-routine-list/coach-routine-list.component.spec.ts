import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachRoutineListComponent } from './coach-routine-list.component';

describe('CoachRoutineListComponent', () => {
  let component: CoachRoutineListComponent;
  let fixture: ComponentFixture<CoachRoutineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachRoutineListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachRoutineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
