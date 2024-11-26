import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoutineNameComponent } from './edit-routine-name.component';

describe('EditRoutineNameComponent', () => {
  let component: EditRoutineNameComponent;
  let fixture: ComponentFixture<EditRoutineNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRoutineNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRoutineNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
