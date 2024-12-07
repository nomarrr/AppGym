import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoutineCardComponent } from './add-routine-card.component';

describe('AddRoutineCardComponent', () => {
  let component: AddRoutineCardComponent;
  let fixture: ComponentFixture<AddRoutineCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRoutineCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRoutineCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
