import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymStatusComponent } from './gym-status.component';

describe('GymStatusComponent', () => {
  let component: GymStatusComponent;
  let fixture: ComponentFixture<GymStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GymStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
