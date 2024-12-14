import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InProgressRoutineComponent } from './in-progress-routine.component';

describe('InProgressRoutineComponent', () => {
  let component: InProgressRoutineComponent;
  let fixture: ComponentFixture<InProgressRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InProgressRoutineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InProgressRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
