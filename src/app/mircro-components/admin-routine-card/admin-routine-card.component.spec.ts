import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoutineCardComponent } from './admin-routine-card.component';

describe('AdminRoutineCardComponent', () => {
  let component: AdminRoutineCardComponent;
  let fixture: ComponentFixture<AdminRoutineCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRoutineCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRoutineCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
