import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachClientCardComponent } from './coach-client-card.component';

describe('CoachClientCardComponent', () => {
  let component: CoachClientCardComponent;
  let fixture: ComponentFixture<CoachClientCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachClientCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachClientCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
