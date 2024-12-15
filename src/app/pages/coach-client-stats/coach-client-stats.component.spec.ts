import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachClientStatsComponent } from './coach-client-stats.component';

describe('CoachClientStatsComponent', () => {
  let component: CoachClientStatsComponent;
  let fixture: ComponentFixture<CoachClientStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachClientStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachClientStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
