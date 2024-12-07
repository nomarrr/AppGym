import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachRoutinesComponent } from './coach-routines.component';

describe('CoachRoutinesComponent', () => {
  let component: CoachRoutinesComponent;
  let fixture: ComponentFixture<CoachRoutinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachRoutinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachRoutinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
