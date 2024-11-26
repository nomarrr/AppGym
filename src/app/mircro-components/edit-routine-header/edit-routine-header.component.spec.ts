import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoutineHeaderComponent } from './edit-routine-header.component';

describe('EditRoutineHeaderComponent', () => {
  let component: EditRoutineHeaderComponent;
  let fixture: ComponentFixture<EditRoutineHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRoutineHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRoutineHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
