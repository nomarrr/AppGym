import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachRoutineCardComponent } from './coach-routine-card.component';

describe('CoachRoutineCardComponent', () => {
  let component: CoachRoutineCardComponent;
  let fixture: ComponentFixture<CoachRoutineCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachRoutineCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachRoutineCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
