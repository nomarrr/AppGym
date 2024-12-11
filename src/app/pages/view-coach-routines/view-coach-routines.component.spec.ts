import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoachRoutinesComponent } from './view-coach-routines.component';

describe('ViewCoachRoutinesComponent', () => {
  let component: ViewCoachRoutinesComponent;
  let fixture: ComponentFixture<ViewCoachRoutinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCoachRoutinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCoachRoutinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
