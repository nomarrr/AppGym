import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InProgressRoutineCardComponent } from './in-progress-routine-card.component';

describe('InProgressRoutineCardComponent', () => {
  let component: InProgressRoutineCardComponent;
  let fixture: ComponentFixture<InProgressRoutineCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InProgressRoutineCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InProgressRoutineCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
