import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignExistentRoutineClientComponent } from './assign-existent-routine-client.component';

describe('AssignExistentRoutineClientComponent', () => {
  let component: AssignExistentRoutineClientComponent;
  let fixture: ComponentFixture<AssignExistentRoutineClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignExistentRoutineClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignExistentRoutineClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
