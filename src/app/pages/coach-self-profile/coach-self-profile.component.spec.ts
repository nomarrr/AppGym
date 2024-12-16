import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachSelfProfileComponent } from './coach-self-profile.component';

describe('CoachSelfProfileComponent', () => {
  let component: CoachSelfProfileComponent;
  let fixture: ComponentFixture<CoachSelfProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachSelfProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachSelfProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
