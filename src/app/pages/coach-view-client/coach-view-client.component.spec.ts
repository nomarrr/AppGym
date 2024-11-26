import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachViewClientComponent } from './coach-view-client.component';

describe('CoachViewClientComponent', () => {
  let component: CoachViewClientComponent;
  let fixture: ComponentFixture<CoachViewClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachViewClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachViewClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
