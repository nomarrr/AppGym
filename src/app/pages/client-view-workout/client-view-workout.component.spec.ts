import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientViewWorkoutComponent } from './client-view-workout.component';

describe('ClientViewWorkoutComponent', () => {
  let component: ClientViewWorkoutComponent;
  let fixture: ComponentFixture<ClientViewWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientViewWorkoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientViewWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
